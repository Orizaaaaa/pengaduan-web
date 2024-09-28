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
            <div className='grid mt-4 grid-cols-3 md:grid-cols-6 lg:grid-cols-8 container mx-auto gap-5'>
                {categoryData.map((item: any, index) => (
                    <div className="image flex-col justify-center items-center" key={index}>
                        <Image width={70} height={70} src={item.image} className={` mx-auto rounded-full
                             object-cover cursor-pointer  `} alt='image' />

                        <p className={`text-sm md:text-base mt-1 text-center`}>{item.name}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Category