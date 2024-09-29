import React from 'react'
import Navbar from '../fragemnts/navbar/Navbar'
import Image from 'next/image'
import { logo } from '@/app/image'
import ButtonPrimary from '../elements/buttonPrimary'
import Footer from '../fragemnts/footer/Footer'
import Location from '../fragemnts/location/Location'
import AboutUs from '../fragemnts/aboutUs/AboutUs'
import EmployeList from '../fragemnts/employeList/EmployeList'
import Galery from '../fragemnts/galery/Galery'
import News from '../fragemnts/news/News'


const LandingPage = () => {

    return (
        <>
            <Navbar />
            <section id='beranda'>
                <div className=' container mx-auto min-h-[102vh] grid grid-cols-1 lg:grid-cols-5 items-center px-4 pt-5 md:px-20  overflow-x-hidden' >
                    <div className="title col-span-3 mt-8 lg:mt-0 order-last lg:order-first">
                        <h1 className='text-3xl lg:text-6xl font-bold text-secondary' >Selamat Datang di website <span className='text-white' >Desa Garut</span> </h1>
                        <p className='mt-5 text-sm md:text-base text-white' >Masyarakat dapat mengadukan permasalahan yang terjadi di garut perihal keamanan, ketertiban umum, kesejahtraan
                            sosial, pemberdayaan masyarakat, pemerintahan, ekonomi dan pembangunan</p>
                        <ButtonPrimary className='py-2 px-4 mt-10 rounded-full bg-secondary'>Buat Laporan</ButtonPrimary>
                    </div>

                    <div className="flex justify-center items-center col-span-2 mt-12 lg:mt-0">
                        <Image src={logo} alt="logo" className='w-auto h-70' />
                    </div>

                </div>
            </section>
            <AboutUs />
            <EmployeList />
            <Galery />
            <News />
            <Location />
            <Footer />
        </>
    )
}

export default LandingPage