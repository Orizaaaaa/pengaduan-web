'use client'
import React from 'react'
import Navbar from '../fragemnts/navbar/Navbar'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import Image from 'next/image'
import ButtonPrimary from '../elements/buttonPrimary'
import { bgPengaduan, headerPengaduan, headerShop, human1, pembangunan } from '@/app/image'
import Search from '../fragemnts/search/Search'
import { IoPersonSharp } from 'react-icons/io5'
import { HiMapPin } from 'react-icons/hi2'
import ButtonSecondary from '../elements/buttonSecondary'
import { MdOutlineCalendarToday } from 'react-icons/md'
import { IoIosArrowForward } from 'react-icons/io'

type Props = {}

const Pembangunan = (props: Props) => {
    return (
        <>
            <Navbar />
            <section className='mb-30' id='header-pengaduan'>
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
                    <h1 className='text-2xl font-bold my-10'>Pembangunan</h1>
                    <div className="w-full md:w-auto"> {/* Membatasi lebar search di layar besar */}
                        <Search className='border-2 border-black' placeholder="Cari Pembangunan..." />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-7">

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
                                <div className="images h-[150px] ">
                                    <Image className='rounded-t-lg w-full h-full' src={pembangunan} alt="jalan rusak" />
                                </div>

                            </SwiperSlide>

                            <SwiperSlide >
                                <div className="images h-[150px] ">
                                    <Image className='rounded-t-lg w-full h-full' src={bgPengaduan} alt="jalan rusak" />
                                </div>

                            </SwiperSlide>

                        </Swiper>

                        <div className="text px-2 py-1 space-y-1">
                            <h1 className='font-semibold'>Pembuatan aula desa</h1>

                            <div className="flex  items-center gap-1">
                                <MdOutlineCalendarToday color='#94a3b8' />
                                <p className='text-sm text-slate-400' >2-4-2024</p>
                            </div>

                            <div className="flex  items-center gap-1">
                                <HiMapPin color='#94a3b8' size={15} />
                                <p className='text-small text-slate-400' >Kp. Tegalkiang No.1 Jawa Barat...</p>
                            </div>

                        </div>
                        <div className="flex px-2 justify-end py-2 items-center gap-3 mt-2">
                            <ButtonPrimary className='py-2 px-4 flex justify-center items-center   rounded-xl text-sm lg:text-base'>Selengkap nya <IoIosArrowForward /> </ButtonPrimary>
                        </div>
                    </div>

                </div>
            </section>

        </>

    )
}

export default Pembangunan