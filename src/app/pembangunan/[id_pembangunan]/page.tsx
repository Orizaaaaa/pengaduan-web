'use client'
import { bgPengaduan, pembangunan } from '@/app/image'
import Map from '@/components/fragemnts/maps/Map'
import Navbar from '@/components/fragemnts/navbar/Navbar'
import Image from 'next/image'
import React from 'react'
import { IoHome } from 'react-icons/io5'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type Props = {}

const page = (props: Props) => {
    return (
        <>
            <Navbar />
            <section className='container mx-auto py-10 px-5 mt-17 rounded-md hover:border-stroke bg-white shadow-default dark:border-strokedark '>
                <div className="flex items-center gap-3 border-b-2 border-dashed border-black">
                    <IoHome size={20} />
                    <h1 className='text-2xl font-bold'>Pembangunan aula kantor</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
                    <div className="rounded-md hover: border-stroke bg-white  shadow-default  dark:border-strokedark ">
                        <Swiper
                            slidesPerView={1} // Jumlah default slide yang ditampilkan
                            spaceBetween={30}
                            pagination={{
                                clickable: true, // Pagination akan bisa diklik
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                        >

                            <SwiperSlide >
                                <div className="images h-[300px] ">
                                    <Image className='rounded-lg w-full h-full' src={pembangunan} alt="jalan rusak" />
                                </div>

                            </SwiperSlide>

                            <SwiperSlide >
                                <div className="images h-[300px] ">
                                    <Image className='rounded-lg w-full h-full' src={bgPengaduan} alt="jalan rusak" />
                                </div>
                            </SwiperSlide>

                        </Swiper>
                    </div>
                    <div className="location">
                        <Map lat={-6.937998511449565} lng={107.60711431503297} />
                    </div>
                </div>
            </section>
        </>

    )
}

export default page