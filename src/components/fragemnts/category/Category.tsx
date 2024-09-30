import { categoryData } from '@/utils/dataObject'
import Image from 'next/image'
import React from 'react'

const Category = () => {
    return (

        <section className='my-15 container mx-auto' id='category'>
            <div className="text-center text-2xl">
                <h1 className="text-primary font-medium" >Kategori</h1>
                <h1 className="text-primary font-bold" >Kategori pelaporan </h1>
            </div>
            <div className='grid my-15 grid-cols-3 md:grid-cols-4 lg:grid-cols-8 container mx-auto gap-5'>
                {categoryData.map((item: any, index) => (
                    <div className="image flex-col justify-center items-center relative" key={index}>
                        {/* Gambar */}
                        <Image
                            width={140}
                            height={140}
                            src={item.image}
                            className={`mx-auto rounded-full object-cover cursor-pointer`}
                            alt='image'
                        />
                        {/* Overlay untuk gelapkan gambar */}
                        <div className="absolute inset-0 bg-black opacity-50 rounded-full"></div>
                        {/* Text */}
                        <p className={`text-sm md:text-base text-white text-center absolute inset-0 flex items-center justify-center`}>
                            {item.name}
                        </p>
                    </div>
                ))}
            </div>


        </section>
    )
}

export default Category