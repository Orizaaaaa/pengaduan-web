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
import Image from 'next/image'
import { building2, peopleConstruct } from '@/app/image'
import SearchNotFound from '../fragemnts/SearchNotFound/SearchNotFound'

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

            <div className="images h-[80vh] w-full relative mb-7">
                <Image className="rounded-t-lg w-full h-full object-cover" src={building2} alt="header" />

                {/* Overlay gradasi hitam */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>

                <div className="container mx-auto absolute flex flex-col justify-center items-start  inset-0 z-10">
                    <h1 className='text-3xl md:text-5xl'>
                        <span className='text-white font-extrabold mr-1'>Pembangunan</span>
                        <span className='font-light'>untuk masa depan Desa</span>
                    </h1>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-yellow-500 relative inline-block">
                        Berkelanjutan
                    </h1>


                    <p className='text-white mt-2 text-sm'>Kami berkomitmen untuk membawa kemajuan dan kesejahteraan bagi desa melalui pembangunan berkelanjutan</p>


                    <div className="flex items-center gap-10 mt-10 text-white">
                        <div className="md:flex items-center gap-3">
                            <h1 className='text-xl md:text-3xl font-black'>20+</h1>
                            <div className="flex flex-col space-y-0 text-sm">
                                <p className='font-light'>PROYEK</p>
                                <p className='font-light'>SELESAI</p>
                            </div>
                        </div>
                        <div className="md:flex items-center gap-3">
                            <h1 className='text-xl md:text-3xl font-black'>100k+</h1>
                            <div className="flex flex-col space-y-0 text-sm">
                                <p className='font-light'>WARGA</p>
                                <p className='font-light'>TERDAMPAK</p>
                            </div>
                        </div>
                        <div className="md:flex items-center gap-3">
                            <h1 className='text-xl md:text-3xl font-black'>15+</h1>
                            <div className="flex flex-col space-y-0 text-sm">
                                <p className='font-light'>MITRA</p>
                                <p className='font-light'>KERJA</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <section className='container mx-auto mb-7 lg:px-8'>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="image">
                        <Image className='rounded-lg' src={peopleConstruct} alt='people' />
                    </div>
                    <div className="text">
                        <h1 className='text-2xl text-primary font-extrabold'>25 Tahun</h1>
                        <h1 className='text-xl text-black'>Mengabdi pada <span className='text-yellow-500' >masyarakat</span> </h1>
                        <p className='mt-5'>
                            Selama 25 tahun, Desa kami terus berkomitmen untuk meningkatkan kesejahteraan masyarakat
                            dengan program pembangunan yang berkelanjutan. Berbagai proyek telah dilaksanakan mulai dari
                            pembangunan infrastruktur jalan, fasilitas umum, hingga program pemberdayaan masyarakat.
                            Kami percaya bahwa dengan gotong royong dan kerjasama, kita dapat mencapai desa yang lebih maju
                            dan sejahtera.
                        </p>
                    </div>
                </div>
            </section>


            {/* content api */}
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

                {!isLoading && (!filteredData || filteredData.length === 0) && (
                    <div className="w-full flex items-center justify-center">
                        <SearchNotFound text="Pembangunan tidak ditemukan" height="300px" width="300px" />
                    </div>
                )}
            </section>
            <Footer />
        </>

    )
}

export default Pembangunan