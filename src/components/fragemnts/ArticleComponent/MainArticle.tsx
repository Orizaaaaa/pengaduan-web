'use client'
import Search from '../search/Search'
import CardLink from '@/components/elements/card/CardLink'
import { usePathname } from 'next/navigation'
import useSWR from 'swr'
import { fetcher } from '@/api/fetcher'
import { url } from '@/api/auth'
import { formatNews } from '@/utils/helper'

type Props = {}

const MainArticle = (props: Props) => {

    const pathname = usePathname()

    const { data, error } = useSWR(`${url}/news/list`, fetcher, {
        keepPreviousData: true,
    });

    const dataNews = data?.data

    const location = (id: string) => {
        if (pathname === '/articles') {
            return ('/articles/' + id)
        } else {
            return ('/dashboard-super-admin/articles/' + id)
        }
    }

    return (
        <section>
            <div className="filtered space-y-3 md:space-y-0 md:flex justify-between w-full items-center gap-10 ">
                <h1 className='text-2xl font-bold'>Artikel</h1>
                <div className="w-full md:w-auto"> {/* Membatasi lebar search di layar besar */}
                    <Search className='border-2 border-black' placeholder="Cari artikel..." />
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-7">
                {dataNews?.map((item: any, index: number) => (
                    <CardLink key={index} href={location(item._id)}>
                        <div className="images h-[150px] ">
                            <img className='rounded-t-lg w-full h-full' src={item.image} alt="jalan rusak" />
                        </div>
                        <div className="text px-2 py-1 space-y-2 mb-2">
                            <h1 className='font-medium text-sm md:text-base' >{item.title}</h1>
                            <p className='text-sm text-slate-400' >{formatNews(item.description)}</p>
                        </div>
                    </CardLink>
                ))}

            </div>
        </section>
    )
}

export default MainArticle