'use client'
import React, { useState } from 'react'
import Navbar from '../fragemnts/navbar/Navbar'
import ButtonPrimary from '../elements/buttonPrimary'
import Search from '../fragemnts/search/Search'
import useSWR from 'swr'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import CardBuilding from '../elements/card/CardBuilding'
import { formatDate } from '@/utils/helper'
import SekeletonReport from '../fragemnts/sekeleton/SekeletonReport'
import Footer from '../fragemnts/LandingPage/footer/Footer'

type Props = {}

const Pembangunan = (props: Props) => {
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

    const isLoading = !data && !error

    return (
        <>
            <Navbar />
            <section className='mb-20' id='header-pengaduan'>
                <div className='container mx-auto min-h-[100vh] grid items-center px-4 pt-5 md:px-20 overflow-x-hidden'>
                    <div className="title">
                        <h1 className='text-4xl lg:text-6xl font-bold text-white'>
                            PEMBANGUAN <br /> DESA
                        </h1>
                        <p className='mt-5 text-sm md:text-base text-white'>
                            Masyarakat dapat melihat pembangunan yang sedang di kerjakan olah desa secara transparan
                        </p>
                        <ButtonPrimary className='py-2 px-4 mt-10 rounded-full bg-primary'>
                            Lihat Pembangunan
                        </ButtonPrimary>
                    </div>
                </div>

            </section>


            <section className='container mx-auto'>
                <div className="filtered space-y-3 md:space-y-0 md:flex justify-between w-full items-center gap-10">
                    <h1 className='text-2xl font-bold '>Pembangunan</h1>
                    <div className="w-full md:w-auto"> {/* Membatasi lebar search di layar besar */}
                        <Search onChange={handleSearch} className='border-2 border-black' placeholder="Cari Pembangunan..." />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-7">

                    {isLoading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <SekeletonReport key={index} />
                        ))

                    ) : (
                        filteredData?.map((item: any, index: number) => (
                            <CardBuilding key={index} title={item.title} imageUrl={item.image}
                                date={formatDate(item.date)} location={item.address}
                                link={`/pembangunan/${item._id}`} />
                        ))
                    )}
                </div>
            </section>
            <Footer />
        </>

    )
}

export default Pembangunan