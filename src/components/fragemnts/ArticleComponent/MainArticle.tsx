'use client'
import Search from '../search/Search'
import CardLink from '@/components/elements/card/CardLink'
import { usePathname } from 'next/navigation'
import useSWR from 'swr'
import { fetcher } from '@/api/fetcher'
import { url } from '@/api/auth'
import { formatDateCapital, formatNews } from '@/utils/helper'
import { useState } from 'react'
import { CiCalendar } from 'react-icons/ci'
import SekeletonReport from '../sekeleton/SekeletonReport'
import SearchNotFound from '../SearchNotFound/SearchNotFound'

type Props = {}

const MainArticle = (props: Props) => {
    const [searchData, setSearchData] = useState("");
    const pathname = usePathname()

    const { data, error } = useSWR(`${url}/news/list`, fetcher, {
        keepPreviousData: true,
    });

    const dataNews = data?.data

    const location = (id: string) => {
        if (pathname === '/articles') {
            return ('/articles/' + id)
        } else if (pathname === '/dashboard-super-admin/articles') {
            return ('/dashboard-super-admin/articles/' + id)
        } else {
            return '/dashboard-officer/articles/' + id
        }
    }

    const handleSearch = (e: any) => {
        setSearchData(e.target.value);
    };

    const filteredData = dataNews?.filter((item: any) => {
        return (
            item.title && item.title.toLowerCase().includes(searchData.toLowerCase())
        );
    });

    console.log(dataNews);

    const isLoading = !data && !error;

    return (
        <section>
            <div className="filtered space-y-3 md:space-y-0 md:flex justify-between w-full items-center gap-10 ">
                <h1 className='text-2xl font-bold'>Artikel</h1>
                <div className="w-full md:w-auto"> {/* Membatasi lebar search di layar besar */}
                    <Search onChange={handleSearch} className='border-2 border-black' placeholder="Cari artikel..." />
                </div>
            </div>
            {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-7">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <SekeletonReport key={index} />
                    ))}
                </div>
            ) : filteredData && filteredData.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-7">
                    {filteredData.map((item: any, index: number) => (
                        <CardLink key={index} href={location(item._id)}>
                            <div className="images h-[150px]">
                                <img className="rounded-t-lg w-full h-full" src={item.image} alt="jalan rusak" />
                            </div>
                            <div className="text px-2 py-1 space-y-2 mb-2">
                                <div className="my-1 flex items-center gap-1">
                                    <CiCalendar color="#94A3B8" />
                                    <p className="text-small text-slate-400 font-light">{formatDateCapital(item.createdAt)}</p>
                                </div>
                                <h1 className="font-medium text-sm md:text-base">{formatNews(item.title)}</h1>
                                <p className="text-sm text-slate-400">{formatNews(item.description)}</p>
                            </div>
                        </CardLink>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center w-full my-7 text-slate-400">
                    <SearchNotFound text="Artikel tidak ditemukan" height="300px" width="450px" />
                </div>
            )}
        </section>
    )
}

export default MainArticle