'use client'
import { bgPengaduan, calendar, mapIcon, moneyIcon, pelaksana, pembangunan, salary, volume } from '@/app/image'
import Map from '@/components/fragemnts/maps/Map'
import Navbar from '@/components/fragemnts/navbar/Navbar'
import Image from 'next/image'
import React from 'react'
import { FaMoneyBill } from 'react-icons/fa6'
import { IoHome } from 'react-icons/io5'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type Props = {}

const page = (props: Props) => {
    const dataDetail = [
        {
            image: '',
            title: 'Anggaran',
            value: 'Rp 10.000.00'
        },
        {
            image: '',
            title: 'Sumber Dana',
            value: 'Alokasi Anggaran Pendapatan dan Belanja Negara (Dana Desa)'
        },
        {
            image: '',
            title: 'Volume',
            value: '500'
        },
        {
            image: '',
            title: 'Pelaksana',
            value: 'Rehab Desa'
        },
        {
            image: '',
            title: 'Tahun',
            value: '12/30/2024'
        },
        {
            image: '',
            title: 'Alamat',
            value: 'RT - / RW LEMBANG'
        },
    ]
    return (
        <>
            <Navbar />
            <section className='container lg:px-40 mx-auto py-10 px-5 mt-17 rounded-md '>

                <h1 className='text-2xl font-bold text-center'>Pembangunan aula kantor</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-10">
                    <Image className='rounded-lg w-full h-full' src={pembangunan} alt="jalan rusak" />
                    <div className="text">
                        <h1 className='text-lg font-medium'>Deskripsi</h1>
                        <p className='text-sm' >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae ut voluptas sequi iste mollitia alias quidem reiciendis laborum, labore quos, impedit enim est. Cumque recusandae est qui soluta tempora expedita.</p>
                    </div>

                </div>

                <section className="detail">
                    <div className="text space-y-2">
                        <h1 className='font-medium'>Detail Pembangunan</h1>
                        <hr className='w-full text-[#eeeeee]' />
                    </div>

                    <div className="grid grid-cols-2 gap-5 mt-10">
                        {dataDetail.map((item, index) => (
                            <div className="flex  gap-5" key={index}>
                                <div>
                                    {item.image}
                                </div>

                                <div className="text">
                                    <h1 className='font-medium' >{item.title}</h1>
                                    <h1>{item.value}</h1>
                                </div>
                            </div>
                        ))}
                    </div>

                </section>

                {/* <div className="rounded-md hover: border-stroke bg-white  shadow-default  dark:border-strokedark mb-20">
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
                            <div className="images h-[300px] w-[50px] ">
                                <Image className='rounded-lg w-full h-full' src={pembangunan} alt="jalan rusak" />
                            </div>

                        </SwiperSlide>

                        <SwiperSlide >
                            <div className="images h-[300px] w-[50px]">
                                <Image className='rounded-lg w-full h-full' src={bgPengaduan} alt="jalan rusak" />
                            </div>
                        </SwiperSlide>

                    </Swiper>
                </div> */}

                <div className="text space-y-2 mt-20">
                    <h1 className='font-medium'>Lokasi Pembangunan</h1>
                    <hr className='w-full text-[#eeeeee]' />
                </div>
                <div className="location mt-5">
                    <Map lat={-6.937998511449565} lng={107.60711431503297} />
                </div>
            </section>
        </>

    )
}

export default page