import { galery1, galery2, galery3, galery4, galery5, galery6 } from '@/app/image'
import Image from 'next/image'
import React from 'react'
import Navbar from '../fragemnts/navbar/Navbar'
import Footer from '../fragemnts/LandingPage/footer/Footer'

type Props = {}

const Galery = (props: Props) => {
    return (
        <>
            <Navbar />
            <section className='container mx-auto my-20'>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="h-80 bg-gray-300"> {/* Gambar 1 */}
                        <Image src={galery1} alt="Gallery Image" className="w-full h-full object-cover rounded-md" />
                    </div>
                    <div className="h-80 bg-gray-300"> {/* Gambar 2 */}
                        <Image src={galery2} alt="Gallery Image" className="w-full h-full object-cover rounded-md" />
                    </div>
                    <div className="h-80 bg-gray-300 "> {/* Gambar 3 */}
                        <Image src={galery3} alt="Gallery Image" className="w-full h-full object-cover rounded-md" />
                    </div>
                    <div className="h-80 bg-gray-300 "> {/* Gambar 4 */}
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
            <Footer />
        </>
    )
}

export default Galery