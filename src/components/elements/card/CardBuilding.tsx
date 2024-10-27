'use client'
import React from 'react'
import { HiMapPin } from 'react-icons/hi2'
import { MdOutlineCalendarToday } from 'react-icons/md'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import ButtonPrimary from '../buttonPrimary'
import { useRouter } from 'next/navigation'
import { IoIosArrowForward } from 'react-icons/io'

type Props = {
    title: string;
    imageUrl: string[];
    date: string;
    location: string;
    link: string;
};

const CardBuilding = ({ title, imageUrl, date, location, link }: Props) => {
    const router = useRouter()

    return (
        <div className="rounded-md hover:border-stroke bg-white shadow-default dark:border-strokedark">
            <Swiper
                slidesPerView={1} // Jumlah default slide yang ditampilkan
                spaceBetween={30}
                pagination={{
                    clickable: true, // Pagination akan bisa diklik
                }}
                modules={[Pagination]}
                className="mySwiper"
            >

                {imageUrl.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="images h-[150px]">
                            <img className="rounded-t-lg w-full h-full" src={item} alt="Gambar" />
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>

            <div className="text px-2 py-1 space-y-1">
                <h1 className="font-semibold">{title}</h1>

                <div className="flex items-center gap-1">
                    <MdOutlineCalendarToday color="#94a3b8" />
                    <p className="text-sm text-slate-400">{date}</p>
                </div>

                <div className="flex items-center gap-1">
                    <HiMapPin color="#94a3b8" size={15} />
                    <p className="text-small text-slate-400">{location}</p>
                </div>
            </div>

            <div className="flex px-2 justify-end py-2 items-center gap-3 mt-1">
                <ButtonPrimary
                    onClick={() => router.push(link)}
                    className="py-2 px-4 flex justify-center items-center rounded-md text-sm lg:text-base"
                >
                    Selengkapnya <IoIosArrowForward />
                </ButtonPrimary>
            </div>
        </div>
    )
}

export default CardBuilding
