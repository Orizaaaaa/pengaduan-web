'use client'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import Image from 'next/image'
import { logo, mkpp } from '@/app/image'
import ButtonPrimary from '../elements/buttonPrimary'
import AboutUs from '../fragemnts/LandingPage/aboutUs/AboutUs'
import EmployeList from '../fragemnts/LandingPage/employeList/EmployeList'
import Galery from '../fragemnts/LandingPage/galery/Galery'
import News from '../fragemnts/LandingPage/news/News'
import Faq from '../fragemnts/LandingPage/faq/Faq'
import Footer from '../fragemnts/LandingPage/footer/Footer'
import Navbar from '../fragemnts/navbar/Navbar'
import { useRouter } from 'next/navigation';
import { Spinner } from '@nextui-org/react';
import AllFitur from './AllFitur';

// Import komponen Map secara dinamis tanpa SSR
const Map = dynamic(() => import('../fragemnts/maps/Map'), {
    ssr: false
});

const LandingUi = () => {
    // State untuk transisi
    const router = useRouter()
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        setRole(localStorage.getItem("role"));
    }, []);

    return (
        <>
            <Navbar />
            <section id='beranda'>
                <div className='container mx-auto min-h-[90vh] lg:min-h-[102vh] grid grid-cols-1 lg:grid-cols-5 items-center px-4 pt-5 md:px-20 overflow-x-hidden'>
                    <div className="title col-span-3 mt-8 lg:mt-0 order-last lg:order-first">
                        <h1 className='text-3xl lg:text-6xl font-bold text-secondary'>Selamat Datang di website <span className='text-white'>Kedai Desa</span></h1>
                        <p className='mt-5 text-sm md:text-base text-white'>
                            Masyarakat dapat mengadukan permasalahan yang terjadi di garut perihal keamanan, ketertiban umum, kesejahtraan
                            sosial, pemberdayaan masyarakat, pemerintahan, ekonomi dan pembangunan.
                        </p>
                        {!role &&
                            <div className="flex gap-5 items-center">
                                <ButtonPrimary onClick={() => router.push('/login')} className='py-2 px-6 mt-10 rounded-lg bg-secondary'>Login</ButtonPrimary>
                                <ButtonPrimary onClick={() => router.push('/register')} className='py-2 text-primary px-6 mt-10 rounded-lg bg-primary'>Daftar</ButtonPrimary>
                            </div>
                        }
                    </div>
                    <div className="flex justify-center items-center col-span-2 mt-12 lg:mt-0">
                        <Image src={logo} alt="logo" className='w-auto h-90 md:h-70' />
                    </div>
                </div>
            </section>
            <AboutUs />
            <AllFitur />
            <EmployeList />
            <Galery />
            <News />
            <section className='container mx-auto my-22' id='lokasi'>
                <div className="text-start text-2xl my-10">
                    <h1 className="text-primary font-medium">Lokasi</h1>
                    <h1 className="text-primary font-bold">Lokasi Desa Kami</h1>
                </div>
                <Map addres='Jl. Pembangunan No.185, Sukagalih, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat 44151' lat={-7.20197979384702} lng={107.88704947092526} />
            </section>
            <Faq />
            <Footer />
        </>

    )
}

export default LandingUi
