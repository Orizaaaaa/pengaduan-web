import { human1 } from '@/app/image'
import { dataText } from '@/utils/dataObject'
import Image from 'next/image'
import React from 'react'

type Props = {}

const AlurAduan = (props: Props) => {
    return (
        <section className="container mx-auto" id='alur aduan'>
            <div className="flex justify-center">
                <hr className="border-3 rounded-md border-primary my-5 w-22" />
            </div>
            <div className="text-center text-2xl">
                <h1 className="text-primary font-medium" >Alur Pengaduan</h1>
                <h1 className="text-primary font-bold" >Bagaimana Membuat Pengaduan</h1>
            </div>


            <div>
                <h1 className='text-center text-2xl md:text-5xl text-white font-extrabold md-2 md:mb-8 uppercase'>Alur Aduan</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="flex justify-center items-center p-4 lg:p-0">
                    <Image src={human1} alt="manager" className="w-auto md:h-[500px]" />
                </div>

                <div className='py-3  w-full px-2 sm:px-0 '>
                    <div className='relative '>
                        {/* <!-- Vertical bar running through middle --> */}
                        <div className="hidden sm:block w-1 border-l-2 border-dashed border-primary absolute h-full ">
                        </div>
                        {dataText.map((item, index) => (
                            <div className={`  sm:mt-0 sm:mb-12`} key={index}>
                                <div className='flex flex-col sm:flex-row items-center'>
                                    <div className={`rounded-full bg-white border-white shadow-2   border-4 w-11 h-11 absolute  flex justify-center items-center  ${index === 4 ? "md:bottom-0" : ""}  ${index === 0 ? "md:top-0" : ""}     transform lg:-translate-x-1/2 `}>
                                        {item.icon}
                                    </div>
                                    <div className='flex justify-start w-full mx-auto items-center'>
                                        <div className='w-full  sm:pl-8'>
                                            <div className='px-4 py-4 md:py-0 rounded transition-all duration-100 ease-out  '>
                                                <h1 className=" text-xl font-semibold lg:text-xl lg:font-bold mt-8 md:mt-0" ><span className="text-primary" >{item.no}</span> {item.title}</h1>
                                                <p className=" text-sm lg:text-base text-slate-500" >{item.subtitle}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        ))}


                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <hr className="border-3 rounded-md border-primary mb-5 w-22" />
            </div>
        </section >
    )
}

export default AlurAduan