
import React from 'react'
import Navbar from '../fragemnts/navbar/Navbar'
import Image from 'next/image'
import { logo } from '@/app/image'
import ButtonPrimary from '../elements/buttonPrimary'
import { IoChatbubblesSharp } from 'react-icons/io5'
import { FaUsersGear } from 'react-icons/fa6'

type Props = {}

const LandingPage = (props: Props) => {
    return (
        <>
            <Navbar />
            <section className='min-h-[92vh] grid grid-cols-1 lg:grid-cols-5 items-center px-4 pt-5 md:px-20  overflow-x-hidden' >
                <div className="title col-span-3">
                    <h1 className='text-2xl lg:text-6xl font-bold' >Selamat Datang di website <span className='text-primary' >Desa Garut</span> </h1>
                    <p className='mt-5' >Masyarakat dapat mengadukan permasalahan yang terjadi di garut perihal keamanan, ketertiban umum, kesejahtraan
                        sosial, pemberdayaan masyarakat, pemerintahan, ekonomi dan pembangunan</p>
                    <ButtonPrimary className='py-2 px-4 mt-10 rounded-full'>Buat Laporan</ButtonPrimary>
                    <div className="flex gap-5 mt-2">
                        <div className="flex justify-start mt-3 gap-2">
                            <IoChatbubblesSharp size={24} color='#024395' />
                            <div className="flex-col font-semibold text-black">
                                <p>10</p>
                                <p>Total Pengaduan</p>
                            </div>
                        </div>

                        <div className="flex justify-start mt-3 gap-2">
                            <FaUsersGear size={24} color='#024395' />
                            <div className="flex-col font-semibold text-black">
                                <p>4</p>
                                <p>aduan yang telah di tindak lanjuti</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center col-span-2">
                    <Image src={logo} alt="logo" className='w-auto h-70' />
                </div>

            </section>
        </>
    )
}

export default LandingPage