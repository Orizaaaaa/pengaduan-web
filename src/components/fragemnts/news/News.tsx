import { image1, image2, image3, titleGaleri } from '@/app/image'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa6'

type Props = {}

const News = (props: Props) => {
    const datahero3 = [
        {
            image: image1,
            title: 'Lorem Ipsum is simply dummy text of the.'
        },
        {
            image: image2,
            title: 'Lorem Ipsum is simply dummy text of the.'
        },
        {
            image: image3,
            title: 'Lorem Ipsum is simply dummy text of the.'
        },
    ]
    return (
        <section className='news my-12' id='news' >
            <div className="container mx-auto p-2 lg:p-0">

                {/* hero1 */}
                <div className="hero-1">
                    <div className="flex justify-between mb-5">
                        <h2 className=" text-xl md:text-2xl font-bold ">Berita</h2>
                        <Link href={''} className='text-primary' >Lihat semua berita</Link>
                    </div>
                </div>

                {/* hero2 */}
                <div className="hero-2 mt-6 ">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 lg:gap-10 ">
                        <div className="col-span-3 h-80 ">
                            <Image className='w-full h-full object-cover rounded-md' src={titleGaleri} alt="news" />
                        </div>

                        <div className="desc col-span-2 flex flex-col justify-between h-full">
                            <div className="flex flex-col ">
                                <h1 className='text-xl md:text-2xl font-medium' >Lorem Ipsum is simply dummy text of the.</h1>
                                <p className='mt-4 text-sm md:text-base mb-3' >Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            </div>
                            <ButtonPrimary className='rounded-md w-full font-semibold p-3' >
                                Buka Berita
                            </ButtonPrimary>
                        </div>
                    </div>
                </div>

                {/* hero 3 bottom*/}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                    {datahero3.map((item, index) => (
                        <div className='h-60 ' key={index}>
                            <Image className='w-full h-full rounded-md' src={item.image} alt='news_btm' />
                            <p className='text-sm md:text-base' >{item.title}</p>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    )
}

export default News