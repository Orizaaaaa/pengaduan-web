'use client'
import { bgPengaduan, pembangunan } from '@/app/image'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { HiMapPin } from 'react-icons/hi2'
import { IoIosArrowForward } from 'react-icons/io'
import { MdOutlineCalendarToday } from 'react-icons/md'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type Props = {}

const Page = (props: Props) => {
    const router = useRouter()
    return (
        <DefaultLayout>
            <div className="flex justify-end">
                <ButtonPrimary className='py-2 px-4 rounded-md' >Tambah Pembangunan</ButtonPrimary>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-7">
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
                        <ButtonPrimary onClick={() => router.push('/dashboard-super-admin/building/12')} className='py-2 px-4 flex justify-center items-center   rounded-xl text-sm lg:text-base'>Selengkap nya <IoIosArrowForward /> </ButtonPrimary>
                    </div>
                </div>
            </div>

        </DefaultLayout>
    )
}

export default Page