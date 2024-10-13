'use client'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import { bannerShop } from '@/app/image'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import CardHover from '@/components/elements/card/CardHover'
import Search from '@/components/fragemnts/search/Search'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { categoryCaraosel } from '@/utils/dataObject'
import Image from 'next/image'

import React from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR from 'swr'


type Props = {}

const page = (props: Props) => {
    const { data, error } = useSWR(`${url}/shop/list`, fetcher, {
        keepPreviousData: true,
    });
    const dataShop = data?.data
    return (
        <DefaultLayout>
            {/* headershop */}
            <div className="bg-[#FFC107] min-h-10 rounded-xl grid md:grid-cols-2 p-10 gap-5 md:gap-0">
                <div className="flex flex-col justify-center items-center">
                    <div className="text">
                        <h1 className=' text-xl md:text-2xl lg:text-3xl font-bold'>Gunakan Fitur  <span className='text-primary font-bold' >Toko Online</span>  untuk
                            memudahkan anda menjual sesuatu </h1>
                        <h2 className='text-slate-400 font-light' >Pesanan Online dibuat mudah,dan cepat </h2>
                        <ButtonPrimary className='py-1 px-2 rounded-md mt-4' >Tambah Produk</ButtonPrimary>
                    </div>
                </div>
                <div className="image order-first md:order-last">
                    <Image className='h-64' src={bannerShop} alt='bannershop' />
                </div>

            </div>

            {/* categories 2 */}
            <section className='my-10' >
                <h1 className='text-2xl font-bold my-10'>Kategori</h1>
                <Swiper
                    slidesPerView={7} // Jumlah default slide yang ditampilkan
                    spaceBetween={30}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true} // Membuat slide menjadi infinite loop
                    breakpoints={{
                        // Saat lebar layar >= 1024px
                        1024: {
                            slidesPerView: 7, // 6 slide
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

                    {categoryCaraosel.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col justify-center items-center">
                                <div className="w-40 h-40 rounded-full overflow-hidden">
                                    <Image className="w-full h-full object-cover" src={item.image} alt="shop1" />
                                </div>
                                <p className='text-center mt-2 text-sm' >{item.title}</p>
                            </div>
                        </SwiperSlide>
                    ))}

                </Swiper>

            </section>

            <div className="filtered space-y-3 md:space-y-0 md:flex justify-between w-full items-center gap-10">
                <h1 className='text-2xl font-bold my-10'>Produk</h1>
                <div className="w-full md:w-auto"> {/* Membatasi lebar search di layar besar */}
                    <Search className='border-2 border-black' placeholder="Cari Produk" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-7">

                <CardHover price={1000000} desc='A clean look for a young squad who have their sights set on the very top. Standing out
                 over those timeless home colours, a simple heat-applied cannon crest is the star of this Arsenal authentic jersey from adidas. 
                 Stay-cool HEAT.RDY and soft doubleknit fabric combine to keep Gunners players pushing for more on the football pitch. This product
                  is made with 100% recycled materials. By reusing materials that have already been created, we help to reduce waste and our
                   reliance on finite resources and reduce the footprint of the products we make.'
                    title='Arsenal Jersey' image='https://preview.thenewsmarket.com/Previews/ADID/StillAssets/800x600/662664.jpg' />

                {dataShop?.map((item: any, index: number) => (
                    <CardHover key={index} title={item.name} desc={item.description} image={item?.image[0]} price={item.price} />
                ))}
            </div>

        </DefaultLayout>
    )
}

export default page