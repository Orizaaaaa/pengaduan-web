'use client'
import { bgPengaduan, human1 } from '@/app/image'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import Image from 'next/image'
import React from 'react'
import { HiMapPin } from 'react-icons/hi2'
import { IoPersonSharp } from 'react-icons/io5'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type Props = {}

const page = (props: Props) => {
    return (
        <DefaultLayout>
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
                                <Image className='rounded-t-lg w-full h-full' src={bgPengaduan} alt="jalan rusak" />
                            </div>

                        </SwiperSlide>
                        <SwiperSlide >
                            <div className="images h-[150px] ">
                                <Image className='rounded-t-lg w-full h-full' src={human1} alt="jalan rusak" />
                            </div>

                        </SwiperSlide>
                    </Swiper>

                    <div className="text px-2 py-1 space-y-1">
                        <h1 className=' text-sm ' >Domba</h1>
                        <h1 className='font-semibold'>Rp 1.000.000</h1>

                        <div className="flex  items-center gap-1">
                            <IoPersonSharp color='#94a3b8' size={15} />
                            <p className='text-sm text-slate-400' >ORIZA SATIVA</p>
                        </div>

                        <div className="flex  items-center gap-1">
                            <HiMapPin color='#94a3b8' size={15} />
                            <p className='text-small text-slate-400' >Kp. Tegalkiang No.1 Jawa Barat...</p>
                        </div>

                    </div>
                    <div className="flex px-2 justify-end py-2 items-center gap-3 mt-2">
                        <ButtonPrimary className='py-2 px-4   rounded-md text-sm lg:text-base'>Beli Sekarang</ButtonPrimary>
                        <ButtonSecondary className='py-2 px-4   rounded-md text-sm lg:text-base' >Detail</ButtonSecondary>
                    </div>
                </div>




                <div className="card  group gap-[0.5em] rounded-[1.5em] relative flex justify-end flex-col p-[1.5em] z-[1] overflow-hidden transition-all duration-500 hover:shadow-none">
                    {/* gambar 1 */}
                    <img
                        src="https://images.unsplash.com/photo-1726093248575-ab58d2873787?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8"
                        alt="Card Image"
                        className="absolute top-0 left-0 w-full h-[45%] object-cover z-[1]"
                    />

                    <div className="absolute top-0 left-0 h-full w-full bg-white z-[2] transition-all duration-500 group-hover:bg-opacity-30 group-hover:backdrop-blur-md">
                        {/* gambar 2 */}
                        <img
                            src="https://images.unsplash.com/photo-1726093248575-ab58d2873787?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8"
                            alt="Card Image"
                            className="absolute top-0 left-0 w-full h-[45%] object-cover z-[1] transition-opacity duration-500 group-hover:opacity-0"
                        />
                    </div>

                    <div className="container footer text-black z-[3] relative font-nunito flex flex-col gap-[0.5em]" >
                        <h1
                            style={{
                                fontWeight: 900,
                                WebkitTextFillColor: 'transparent',
                                WebkitTextStrokeWidth: '1px',
                            }}
                            className="card_heading text-[1.5em] tracking-[.2em]"
                        >
                            STEEL BALL RUN
                        </h1>

                        <div className="flex justify-left items-center h-fit w-full gap-[1.5em]">
                            <div className="w-fit h-fit flex justify-left gap-[0.5em]">
                                <svg fill="#222222" className="h-[1em] w-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path d="M316.7 17.8l65.43 132.4l146.4 21.29c26.27 3.796 36.79 36.09 17.75 54.59l-105.9 102.1l25.05 145.5c4.508 26.31-23.23 45.9-46.49 33.7L288 439.6l-130.9 68.7C133.8 520.5 106.1 500.9 110.6 474.6l25.05-145.5L29.72 226.1c-19.03-18.5-8.516-50.79 17.75-54.59l146.4-21.29l65.43-132.4C271.1-6.083 305-5.786 316.7 17.8z" />
                                </svg>
                            </div>
                            <div className="w-fit h-fit text-black font-nunito text-[1.2em] font-light">
                                <p>4.5/5 stars</p>
                            </div>
                        </div>

                        <div className="flex justify-center items-center h-fit w-fit gap-[0.5em]">
                            <div className="border-2 border-[#222222] rounded-[0.5em] text-black font-nunito text-[1em] font-normal px-[0.5em] py-[0.05em] hover:bg-[#222222] hover:text-white duration-300 cursor-pointer">
                                <p>Drama</p>
                            </div>
                            <div className="border-2 border-[#222222] rounded-[0.5em] text-black font-nunito text-[1em] font-normal px-[0.5em] py-[0.05em] hover:bg-[#222222] hover:text-white duration-300 cursor-pointer">
                                <p>Action</p>
                            </div>
                            <div className="border-2 border-[#222222] rounded-[0.5em] text-black font-nunito text-[1em] font-normal px-[0.5em] py-[0.05em] hover:bg-[#222222] hover:text-white duration-300 cursor-pointer">
                                <p>Balls</p>
                            </div>
                        </div>
                    </div>

                    <p className="font-nunito block text-black font-light relative h-[0em] group-hover:h-[7em] leading-[1.2em] duration-500 overflow-hidden z-[3]">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet officiis, dolorem ab animi magnam culpa fugit error voluptates adipisci, debitis ut fuga at nisi laborum suscipit a eos similique unde.
                    </p>
                </div>








            </div>

        </DefaultLayout>
    )
}

export default page