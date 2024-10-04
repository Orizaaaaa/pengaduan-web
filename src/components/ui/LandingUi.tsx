'use client'
import React from 'react'
import Image from 'next/image'
import { logo } from '@/app/image'
import ButtonPrimary from '../elements/buttonPrimary'
import AboutUs from '../fragemnts/LandingPage/aboutUs/AboutUs'
import EmployeList from '../fragemnts/LandingPage/employeList/EmployeList'
import Galery from '../fragemnts/LandingPage/galery/Galery'
import News from '../fragemnts/LandingPage/news/News'
import Faq from '../fragemnts/LandingPage/faq/Faq'
import Footer from '../fragemnts/LandingPage/footer/Footer'
import Map from '../fragemnts/maps/Map'
import Navbar from '../fragemnts/navbar/Navbar'






const LandingUi = () => {

    return (
        <>
            <Navbar />
            <section id='beranda'>
                <div className=' container mx-auto min-h-[90vh] lg:min-h-[102vh] grid grid-cols-1 lg:grid-cols-5 items-center px-4 pt-5 md:px-20  overflow-x-hidden' >
                    <div className="title col-span-3 mt-8 lg:mt-0 order-last lg:order-first">
                        <h1 className='text-3xl lg:text-6xl font-bold text-secondary' >Selamat Datang di website <span className='text-white' >Desa Garut</span> </h1>
                        <p className='mt-5 text-sm md:text-base text-white' >Masyarakat dapat mengadukan permasalahan yang terjadi di garut perihal keamanan, ketertiban umum, kesejahtraan
                            sosial, pemberdayaan masyarakat, pemerintahan, ekonomi dan pembangunan</p>
                        <ButtonPrimary className='py-2 px-4 mt-10 rounded-full bg-secondary'>Buat Laporan</ButtonPrimary>
                    </div>

                    <div className="flex justify-center items-center col-span-2 mt-12 lg:mt-0">
                        <Image src={logo} alt="logo" className='w-auto h-90 md:h-70' />
                    </div>

                </div>
            </section>
            <AboutUs />
            <EmployeList />
            <Galery />
            <News />
            <section className='container mx-auto my-22' id='lokasi'>
                <div className="text-start text-2xl my-10">
                    <h1 className="text-primary font-medium" >Lokasi</h1>
                    <h1 className="text-primary font-bold" >Lokasi Desa Kami</h1>
                </div>
                <Map lat={-6.937998511449565} lng={107.60711431503297} />
            </section>
            <Faq />
            <Footer />
        </>
    )
}

export default LandingUi