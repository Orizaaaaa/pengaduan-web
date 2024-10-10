'use client'
import React from 'react'
import Navbar from '../fragemnts/navbar/Navbar'
import Footer from '../fragemnts/LandingPage/footer/Footer'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR from 'swr'
import { fetcher } from '@/api/fetcher'
import { url } from '@/api/auth'

type Props = {}

const Galery = (props: Props) => {
    const { data, error } = useSWR(`${url}/gallery/list`, fetcher, {
        keepPreviousData: true,
    });
    const dataImage = data?.data
    return (
        <>
            <Navbar />
            <section className="image-list  container mx-auto my-20">
                <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4  gap-4">
                    {dataImage?.map((item: any, index: any) => (
                        <div className="cover group relative" key={index}>
                            <Swiper
                                spaceBetween={10}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination]}
                                className="mySwiper h-full rounded-lg"
                            >
                                {item.name?.map((image: any, index: any) => (
                                    <SwiperSlide key={index}>
                                        <div className="relative h-50">
                                            <img
                                                src={image} // Mengambil URL langsung dari `image`
                                                alt={`preview-${image}`}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Galery