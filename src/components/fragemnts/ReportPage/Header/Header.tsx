import { logo } from '@/app/image'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import Image from 'next/image'
import React from 'react'

type Props = {}

const Header = (props: Props) => {
    return (
        <section id='header-report'>
            <div className=' container mx-auto min-h-[100vh] grid items-center px-4 pt-5 md:px-20  overflow-x-hidden' >
                <div className="title ">
                    <h1 className='text-4xl lg:text-6xl font-bold text-white' >PENGADUAN <br /> MASYARAKAT</h1>
                    <p className='mt-5 text-sm md:text-base text-white' >Masyarakat dapat mengadukan permasalahan yang terjadi di garut perihal keamanan, ketertiban umum, kesejahtraan
                        sosial, pemberdayaan masyarakat, pemerintahan, ekonomi dan pembangunan</p>
                    <ButtonPrimary className='py-2 px-4 mt-10 rounded-full bg-primary'>Buat Laporan</ButtonPrimary>
                </div>

            </div>
        </section>
    )
}

export default Header