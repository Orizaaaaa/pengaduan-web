'use client'
import { employe } from '@/app/image'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import React, { useState } from 'react'
import { BiCategory } from 'react-icons/bi'
import { BsArchive } from 'react-icons/bs'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type Props = {}

const page = (props: Props) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const images = [
        'https://preview.thenewsmarket.com/Previews/ADID/StillAssets/960x540/651510.jpg',
        'https://i.ebayimg.com/images/g/BDMAAOSwrR9mprQH/s-l1200.jpg',
        'https://rukminim2.flixcart.com/image/850/1000/l432ikw0/shoe/v/3/y/-original-imagf255cpm6k7zr.jpeg?q=20&crop=false',
        'https://i.ebayimg.com/images/g/BDMAAOSwrR9mprQH/s-l1200.jpg',
        'https://rukminim2.flixcart.com/image/850/1000/l432ikw0/shoe/v/3/y/-original-imagf255cpm6k7zr.jpeg?q=20&crop=false',
    ];
    return (
        <DefaultLayout>
            <div className="min-h-[100vh] bg-white p-4 rounded-md">
                <div className="grid grid-cols-2 gap-4">
                    <div className="wrap">
                        <div className="max-w-lg mx-auto">
                            {/* Main Swiper for the large image */}
                            <Swiper
                                spaceBetween={10}
                                navigation={true}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[Navigation, Thumbs]}
                                className="mb-4"
                            >
                                {images.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="w-full h-55">
                                            <img src={img} alt={`Slide ${index}`} className="w-full h-full  object-cover rounded-md" />
                                        </div>

                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Thumbnail Swiper */}
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={4}
                                watchSlidesProgress={true}
                                modules={[Thumbs]}
                                className="swiper-thumbs"
                            >
                                {images.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="h-30 w-full">
                                            <img src={img} alt={`Thumb ${index}`} className="w-full h-full object-cover cursor-pointer rounded-md" />
                                        </div>

                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        <div className="flex justify-end mt-3 ">
                            <ButtonPrimary className='py-1 px-2 rounded-md'>
                                Beli Sekarang
                            </ButtonPrimary>
                        </div>


                    </div>


                    <div className="text">
                        <div className="title space-y-2">
                            <h1 className='text-xl font-semibold' >Adidas X Marvel</h1>
                            <h1 className='text-xl font-semibold' >Rp. 1.000.000</h1>
                        </div>
                        <div className="adress mt-3">
                            <div className="flex items-center gap-3">
                                <BiCategory size={20} />
                                <p>Fashion</p>
                            </div>
                        </div>
                        <div className="adress mt-3">
                            <div className="flex items-center gap-3">
                                <FaMapMarkerAlt size={20} />
                                <p>Bandung amerika</p>
                            </div>
                        </div>
                        <div className="adress mt-3">
                            <div className="flex items-center gap-3">
                                <BsArchive size={20} />
                                <p>14</p>
                            </div>
                        </div>


                        <div className="desc mt-3">
                            <h1 className='text-lg font-semibold' >Deskripsi</h1>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus, consequatur veniam excepturi iusto beatae ullam nobis sed. Aspernatur reprehenderit architecto non beatae magnam autem iste! Expedita ut ipsa cumque ea?</p>
                        </div>

                        <div className="user mt-3 border-black border-2 p-2 rounded-md ">
                            <div className="flex gap-3">
                                <div className="w-15 h-15">
                                    <img className='rounded-full object-cover w-full h-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaNkwLyEyzTkzMxP-UkOMaOArlSmqK6O9GFw&s' alt="user" />
                                </div>
                                <div className="text">
                                    <h1 className='font-medium'>Gabriel Yonathan</h1>
                                    <p className='text-slate-500'>08968665435567</p>
                                </div>
                            </div>

                        </div>
                    </div>



                </div>
            </div>


        </DefaultLayout>
    )
}

export default page