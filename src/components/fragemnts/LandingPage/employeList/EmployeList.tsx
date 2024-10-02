'use client'

import { employe, human1 } from '@/app/image'
import Image from 'next/image'
import React from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type Props = {}

const EmployeList = (props: Props) => {


    return (
        <section className='container mx-auto my-15'>
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
                <SwiperSlide >
                    <div className="h-[300px] bg-primary rounded-md flex justify-end items-center flex-col ">
                        <Image className="w-auto" src={employe} alt="human" />
                        <div className="p-4 bg-white w-full text-center">
                            <p className=' font-bold' >Gabriel yonathan</p>
                            <p className='text-slate-500 text-sm' >Psikolog Klinis | Spesialis Keluarga</p>
                        </div>
                    </div>

                </SwiperSlide>
                <SwiperSlide >
                    <div className="h-[300px] bg-primary rounded-md flex justify-end items-center flex-col ">
                        <Image className="w-auto" src={employe} alt="human" />
                        <div className="p-4 bg-white w-full text-center">
                            <p className=' font-bold' >Gabriel kafir</p>
                            <p className='text-slate-500 text-sm' >Psikolog Klinis | Spesialis Keluarga</p>
                        </div>
                    </div>

                </SwiperSlide>
                <SwiperSlide >
                    <div className="h-[300px] bg-primary rounded-md flex justify-end items-center flex-col ">
                        <Image className="w-auto" src={employe} alt="human" />
                        <div className="p-4 bg-white w-full text-center">
                            <p className=' font-bold' >Gabriel kafir</p>
                            <p className='text-slate-500 text-sm' >Psikolog Klinis | Spesialis Keluarga</p>
                        </div>
                    </div>

                </SwiperSlide>
                <SwiperSlide >
                    <div className="h-[300px] bg-primary rounded-md flex justify-end items-center flex-col ">
                        <Image className="w-auto" src={employe} alt="human" />
                        <div className="p-4 bg-white w-full text-center">
                            <p className=' font-bold' >Gabriel kafir</p>
                            <p className='text-slate-500 text-sm' >Psikolog Klinis | Spesialis Keluarga</p>
                        </div>
                    </div>

                </SwiperSlide>




            </Swiper>
        </section>
    )
}

export default EmployeList