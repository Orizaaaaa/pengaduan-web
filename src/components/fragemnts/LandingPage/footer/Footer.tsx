'use client'
import { leftPatern, logo } from '@/app/image'
import { informationData, pages } from '@/utils/dataObject'
import Image from 'next/image'
import React from 'react'


const Footer = () => {
    return (
        <section id='footer'>
            <Image className='w-full h-34' src={leftPatern} alt='left' />
            <section className='bg-[#002956]' >
                <div className="container mx-auto py-5 px-3 md:px-0">
                    <div className="grid grid-cols-1 gap-5 md:gap-0  md:grid-cols-3  mt-7">
                        <div className="information  space-y-2">
                            <div className="flex gap-3">
                                <Image src={logo} alt="logo" className='w-auto h-20' />
                                <div className="text">
                                    <h1 className='text-white font-bold' >PT CITRA PRADANA  <br /> MANDIRI TBK </h1>
                                    <p className='text-white font-light' >Kota garut maju bersama indonesia emas</p>
                                </div>

                            </div>



                        </div>
                        <div className="information  space-y-2">
                            <h1 className='text-white font-medium' >Pages</h1>
                            {pages.map((item, index) => (
                                <div className="flex justify-start items-center gap-2 text-white font-light" key={index}>

                                    <p className=' text-sm md:text-base' >{item.text}</p>
                                </div>
                            ))}
                        </div>
                        <div className="folow-me  space-y-2">
                            <h1 className='text-white font-medium'  >Contact</h1>
                            {informationData.map((item, index) => (
                                <div className="flex justify-start items-center gap-2 text-white font-light" key={index}>
                                    {item.icon}
                                    <p className='text-sm md:text-base' >{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="bg-primary text-center text-white text-sm py-2">
                    © 2022 PT. Citra Pradana Mandiri TBK
                </div>
            </section>
        </section>

    )
}

export default Footer