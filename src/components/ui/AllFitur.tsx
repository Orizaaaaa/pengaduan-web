import { building, galery, leftPatern, newspaper, onlineShopping, pupr, report, rightPatern } from '@/app/image'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { text } from 'stream/consumers'

type Props = {}

const AllFitur = (props: Props) => {
    const dataFitur = [
        {
            image: report,
            text: 'Pengaduan',
            location: '/report'
        },
        {
            image: galery,
            text: 'Galeri',
            location: '/galery'
        },
        {
            image: newspaper,
            text: 'Artikel',
            location: '/articles'
        },
        {
            image: onlineShopping,
            text: 'Toko Online',
            location: '/shop'
        },
        {
            image: building,
            text: 'Pembangunan',
            location: '/pembangunan'
        },



    ]
    return (
        <div>
            <Image className='w-full ' src={leftPatern} alt='left' />
            <div className="bg-[#002956]">
                <div className="container mx-auto ">
                    <div className="text-start text-white">
                        <h1 className='font-semibold text-2xl' >SEMUA FITUR KAMI</h1>
                        <p>ini adalah beberapa fitur yang kami sediakan.</p>
                    </div>

                    <div className='grid pt-12 pb-34 grid-cols-3  lg:grid-cols-5 gap-5'>
                        {dataFitur.map((item: any, index: number) => (
                            <Link key={index} href={item.location} className='flex flex-col justify-center items-center'>
                                <div className=" w-30 h-30 ">
                                    <Image
                                        src={item.image}
                                        className={`mx-auto rounded-md object-cover cursor-pointer w-full h-full `}
                                        alt='image'
                                    />
                                </div>
                                <h1 className='text-xl text-white mt-2' >{item.text}</h1>
                            </Link>
                        ))}
                    </div>

                </div>
                <Image className='w-full ' src={rightPatern} alt='right' />
            </div>
        </div>
    )
}

export default AllFitur