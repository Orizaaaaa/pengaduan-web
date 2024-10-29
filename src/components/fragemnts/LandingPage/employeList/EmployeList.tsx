'use client'

import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import { employe, human1, rightPatern } from '@/app/image'
import { capitalizeWords } from '@/utils/helper'
import Image from 'next/image'
import React from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR from 'swr'

type Props = {}

const EmployeList = (props: Props) => {

    const { data, error } = useSWR(`${url}/employee/list`, fetcher, {
        keepPreviousData: true,
    });
    const dataEmploye = data?.data

    console.log(data);


    return (
        <section className='container mx-auto mb-9'>
            <div className="text-center text-2xl my-10">
                <h1 className="text-primary font-medium" >Staff Karyawan</h1>
                <h1 className="text-primary font-bold" >Berikut adalah staff kami</h1>
            </div>

            <Swiper
                slidesPerView={3} // Jumlah default slide yang ditampilkan
                spaceBetween={30}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    // Saat lebar layar >= 1024px
                    1024: {
                        slidesPerView: 3, // 3 slide
                        spaceBetween: 30,
                    },
                    // Saat lebar layar >= 768px
                    768: {
                        slidesPerView: 2, // 2 slide
                        spaceBetween: 20,
                    },
                    // Untuk layar <= 640px, 1 slide akan ditampilkan
                    0: {
                        slidesPerView: 1, // 1 slide
                        spaceBetween: 10,
                    },
                }}
                modules={[Autoplay]}
                className="mySwiper"
            >
                {dataEmploye?.map((item: any, index: number) => (
                    <SwiperSlide key={index} >
                        <div className="bg-primary rounded-t-md flex justify-end items-center flex-col">
                            <div className="h-[300px] w-full rounded-t-md">
                                <img
                                    className="w-full h-full object-cover object-top rounded-t-md"
                                    src={item.image}
                                    alt="human"
                                />

                            </div>

                            <div className="p-4 bg-white w-full text-center">
                                <p className="font-bold">{capitalizeWords(item.name)}</p>
                                <p className="text-slate-500 text-sm">{item.division} | {item.position}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}



            </Swiper>
        </section>
    )
}

export default EmployeList