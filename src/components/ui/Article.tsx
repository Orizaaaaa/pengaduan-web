import React from 'react'
import CardLink from '../elements/card/CardLink'
import Image from 'next/image'
import { bgPengaduan, human1, image1 } from '@/app/image'
import Navbar from '../fragemnts/navbar/Navbar'
import Footer from '../fragemnts/LandingPage/footer/Footer'
import Search from '../fragemnts/search/Search'

type Props = {}

const Article = (props: Props) => {
    return (
        <>
            <Navbar />
            <section className='container mx-auto min-h-[80vh]'>
                <div className="filtered space-y-3 md:space-y-0 md:flex justify-between w-full items-center gap-10 mt-17">
                    <h1 className='text-2xl font-bold'>Artikel</h1>
                    <div className="w-full md:w-auto"> {/* Membatasi lebar search di layar besar */}
                        <Search className='border-2 border-black' placeholder="Cari artikel..." />
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-7">
                    <CardLink href="/">
                        <div className="images h-[150px] ">
                            <Image className='rounded-t-lg w-full h-full' src={bgPengaduan} alt="jalan rusak" />
                        </div>
                        <div className="text px-2 py-1 space-y-2">
                            <h1 className='font-medium text-sm md:text-base' >Contoh Diskusi Yang Efektif</h1>
                            <p className='text-sm text-slate-400' >Jenis diskusi yang efektif dapat di lakukan secara online</p>
                        </div>
                    </CardLink>
                </div>
            </section>

            <Footer />

        </>

    )
}

export default Article