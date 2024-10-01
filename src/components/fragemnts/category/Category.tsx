import { categoryData } from '@/utils/dataObject'
import { Button, Popover, PopoverContent, PopoverTrigger, Tooltip } from '@nextui-org/react'
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

                    <Popover placement="top" key={index}>
                        <PopoverTrigger>
                            <div className="image flex-col justify-center items-center relative cursor-pointer" >
                                <Image
                                    width={140}
                                    height={140}
                                    src={item.image}
                                    className={`mx-auto rounded-full object-cover cursor-pointer`}
                                    alt='image'
                                />

                                <div className="absolute inset-0 bg-black opacity-50 rounded-full"></div>
                            </div>
                        </PopoverTrigger>

                        <PopoverContent>
                            <div className="px-1 py-2">
                                <div className="text-small ">{item.name}</div>
                            </div>
                        </PopoverContent>
                    </Popover>



                ))}
            </div>



        </section>
    )
}

export default Category