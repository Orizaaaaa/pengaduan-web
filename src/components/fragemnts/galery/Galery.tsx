'use client'

import { galery1, galery2, galery3, galery4, galery5, galery6 } from '@/app/image';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {}

const Galery = (props: Props) => {
    return (
        <section className='container mx-auto py-10'>
            <div className="flex justify-between mb-5">
                <h2 className=" text-xl md:text-2xl font-bold "> Galeri</h2>
                <Link href={''} className='text-primary' >Lihat semua galeri</Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="h-80 bg-gray-300"> {/* Gambar 1 */}
                    <Image src={galery1} alt="Gallery Image" className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="h-80 bg-gray-300"> {/* Gambar 2 */}
                    <Image src={galery2} alt="Gallery Image" className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="h-80 bg-gray-300 md:col-span-2"> {/* Gambar 3 */}
                    <Image src={galery3} alt="Gallery Image" className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="h-80 bg-gray-300 md:col-span-2"> {/* Gambar 4 */}
                    <Image src={galery4} alt="Gallery Image" className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="h-80 bg-gray-300 "> {/* Gambar 5 */}
                    <Image src={galery5} alt="Gallery Image" className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="h-80 bg-gray-300  "> {/* Gambar 6 */}
                    <Image src={galery6} alt="Gallery Image" className="w-full h-full object-cover rounded-md" />
                </div>
            </div>
        </section>
    )
}

export default Galery;
