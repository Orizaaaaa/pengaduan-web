import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    location: string
    image: string
    title: string
}

const CardLink = ({ location, image, title }: Props) => {
    return (
        <Link href={location} className="rounded-lg hover: border-stroke transform transition-transform 
        duration-300 hover:scale-105 bg-white p-4 lg:px-7.5 lg:py-6 shadow-default 
        dark:border-strokedark h-full grid" >
            <div className="images h-[150px] w-full relative">
                <Image className='rounded-lg w-full h-full' src={image} alt="jalan rusak" />
            </div>
            <p>{title}</p>
        </Link>
    )
}

export default CardLink