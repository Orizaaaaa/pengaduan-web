'use client'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import Map from '@/components/fragemnts/maps/Map'
import Navbar from '@/components/fragemnts/navbar/Navbar'
import { formatDate, formatRupiah, parseCoordinate } from '@/utils/helper'

import { useParams } from 'next/navigation'
import React from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR from 'swr'

type Props = {}

const page = (props: Props) => {
    const idBuilding = useParams().id_pembangunan
    const { data, error } = useSWR(`${url}/infrastucture/${idBuilding}`, fetcher, {
        keepPreviousData: true,
    });
    const dataBuilding = data?.data
    const dataDetail = [
        {
            title: 'Anggaran',
            value: formatRupiah(dataBuilding?.budget)
        },
        {
            title: 'Sumber Dana',
            value: dataBuilding?.source_of_funds
        },
        {
            title: 'Volume',
            value: `${dataBuilding?.volume} m³`
        },
        {
            title: 'Status',
            value: dataBuilding?.status
        },
        {
            title: 'Tahun',
            value: formatDate(dataBuilding?.date)
        },
        {
            title: 'Alamat',
            value: dataBuilding?.address
        },
    ]


    return (
        <>
            <Navbar />
            <section className='container lg:px-40 mx-auto py-10 px-5 mt-17 rounded-md '>

                <h1 className='text-2xl font-bold text-center'>{dataBuilding?.title}</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
                    <div className="rounded-md hover: border-stroke bg-white  shadow-default  dark:border-strokedark">
                        <Swiper
                            slidesPerView={1} // Jumlah default slide yang ditampilkan
                            spaceBetween={30}
                            pagination={{
                                clickable: true, // Pagination akan bisa diklik
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                        >

                            {dataBuilding?.image.map((item: any, index: number) => (
                                <SwiperSlide key={index} >
                                    <div className="images h-[300px]  ">
                                        <img className='rounded-lg w-full h-full' src={item} alt={item} />
                                    </div>

                                </SwiperSlide>
                            ))}

                        </Swiper>
                    </div>

                    <div className="text">
                        <h1 className='text-lg font-medium'>Deskripsi</h1>
                        <p className='text-sm' >{dataBuilding?.description}</p>
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

                                <div className="text">
                                    <h1 className='font-medium' >{item?.title}</h1>
                                    <h1>{item?.value}</h1>
                                </div>
                            </div>
                        ))}
                    </div>

                </section>



                <div className="text space-y-2 mt-20">
                    <h1 className='font-medium'>Lokasi Pembangunan</h1>
                    <hr className='w-full text-[#eeeeee]' />
                </div>
                <div className="location mt-5">
                    {dataBuilding?.location?.latitude && dataBuilding?.location?.longitude ? (
                        <Map
                            lat={parseCoordinate(dataBuilding?.location?.latitude)}
                            lng={parseCoordinate(dataBuilding?.location?.longitude)}
                        />
                    ) : (
                        <p>Loading map...</p> // Bisa juga berupa loader
                    )}
                </div>
            </section>
        </>

    )
}

export default page