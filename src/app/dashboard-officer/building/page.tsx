'use client'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import CardBuilding from '@/components/elements/card/CardBuilding'
import Search from '@/components/fragemnts/search/Search'
import SearchNotFound from '@/components/fragemnts/SearchNotFound/SearchNotFound'
import SekeletonReport from '@/components/fragemnts/sekeleton/SekeletonReport'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { formatDate, formatDateCapital } from '@/utils/helper'
import { useRouter } from 'next/navigation'

import React, { useState } from 'react'
import useSWR from 'swr'

type Props = {}

const Page = (props: Props) => {
    const [searchData, setSearchData] = useState("");
    const { data, error } = useSWR(`${url}/infrastucture/list`, fetcher, {
        keepPreviousData: true,
    });
    const dataPembanguan = data?.data

    const handleSearch = (e: any) => {
        setSearchData(e.target.value);
    };

    const filteredData = dataPembanguan?.filter((item: any) => {
        return (
            item.title && item.title.toLowerCase().includes(searchData.toLowerCase())

        );
    });


    console.log(dataPembanguan);
    const router = useRouter()
    const isLoading = !data && !error

    return (
        <DefaultLayout>
            <div className="filtered space-y-3 md:space-y-0 md:flex justify-between w-full items-center gap-10">
                <ButtonPrimary onClick={() => router.push('/dashboard-officer/building/create')} className='py-2 px-4 rounded-md' >Tambah Pembangunan</ButtonPrimary>
                <div className="w-full md:w-auto"> {/* Membatasi lebar search di layar besar */}
                    <Search onChange={handleSearch} className='border-2 border-black' placeholder="Cari Pembangunan..." />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-7">

                {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <SekeletonReport key={index} />
                    ))

                ) : (
                    filteredData?.map((item: any, index: number) => (
                        <CardBuilding key={index} title={item.title} imageUrl={item.image}
                            date={formatDateCapital(item.date)} location={item.address}
                            link={`/dashboard-officer/building/${item._id}`} />
                    ))
                )}

            </div>

            {!isLoading && (!filteredData || filteredData.length === 0) && (
                <div className="w-full flex items-center justify-center">
                    <SearchNotFound text="Pembangunan tidak ditemukan" height="300px" width="300px" />
                </div>
            )}

        </DefaultLayout>
    )
}

export default Page