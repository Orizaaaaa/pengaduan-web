'use client'
import React, { useEffect } from 'react'
import Search from '../search/Search'
import CardLink from '@/components/elements/card/CardLink'
import Image from 'next/image'
import { bgPengaduan } from '@/app/image'
import { usePathname } from 'next/navigation'

type Props = {}

const MainArticle = (props: Props) => {

    const pathname = usePathname()


    const location = (id: string) => {
        if (pathname === '/articles') {
            return ('/articles/' + id)
        } else {
            return ('/dashboard-admin/articles/' + id)
        }
    }

    return (
        <section>
            <div className="filtered space-y-3 md:space-y-0 md:flex justify-between w-full items-center gap-10 ">
                <h1 className='text-2xl font-bold'>Artikel</h1>
                <div className="w-full md:w-auto"> {/* Membatasi lebar search di layar besar */}
                    <Search className='border-2 border-black' placeholder="Cari artikel..." />
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-7">
                <CardLink href={location('1')}>
                    <div className="images h-[150px] ">
                        <Image className='rounded-t-lg w-full h-full' src={bgPengaduan} alt="jalan rusak" />
                    </div>
                    <div className="text px-2 py-1 space-y-2 mb-2">
                        <h1 className='font-medium text-sm md:text-base' >Contoh Diskusi Yang Efektif</h1>
                        <p className='text-sm text-slate-400' >Jenis diskusi yang efektif dapat di lakukan secara onli...</p>
                    </div>
                </CardLink>
            </div>
        </section>
    )
}

export default MainArticle