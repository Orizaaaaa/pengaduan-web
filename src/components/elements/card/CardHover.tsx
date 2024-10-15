import { formatNews, formatRupiah } from '@/utils/helper'
import Link from 'next/link'
import React from 'react'
import { IoStar } from 'react-icons/io5'

type Props = {
    image: string
    title: string
    desc: string
    location: string
    onBuy?: any
    price: number

}

const CardHover = ({ image, title, desc, location, onBuy, price }: Props) => {
    return (
        <div className="card group gap-[0.5em] rounded-[1.5em] relative flex justify-end flex-col p-[1.5em] z-[1] overflow-hidden transition-all duration-500 hover:shadow-none border-2 border-white group-hover:border-black">
            {/* gambar 1 */}
            <img
                src={image}
                alt="Card Image"
                className="absolute top-0 left-0 w-full h-[45%] object-cover z-[1]"
            />

            <div className="absolute top-0 left-0 h-full w-full bg-white z-[2] transition-all duration-500 group-hover:bg-opacity-30 group-hover:backdrop-blur-md">
                {/* gambar 2 */}
                <img
                    src={image}
                    alt="Card Image"
                    className="absolute top-0 left-0 w-full h-full object-cover z-[1] transition-opacity duration-500 group-hover:opacity-0"
                />
            </div>

            <div className="container footer text-white z-[3] relative flex flex-col gap-[0.5em] group-hover:text-black">
                <h1
                    className="group-hover:text-black"
                    style={{
                        WebkitTextFillColor: 'transparent',
                        WebkitTextStrokeWidth: '1px',
                    }}
                >

                    {formatNews(title, 56)}
                </h1>

                <div className="flex justify-left items-center h-fit w-full gap-[1.5em]">
                    <div className="w-fit h-fit flex justify-left gap-[0.5em] group-hover:text-black">
                        <IoStar />
                    </div>
                    <div className="w-fit h-fit text-white font-nunito  font-light group-hover:text-black">
                        <p className='text-base' >4.5/5 stars</p>
                    </div>
                </div>

                <div className="flex justify-left items-center h-fit w-full ">
                    <div className="w-fit h-fit text-white font-nunito  font-light group-hover:text-black">
                        <p className='text-base font-medium' > {formatRupiah(price)}</p>
                    </div>
                </div>

                <div className="flex justify-center items-center h-fit w-fit gap-[0.5em]">
                    <div onClick={onBuy} className="border-2 border-white rounded-[0.5em] text-white font-nunito text-[1em] font-normal px-[0.5em] py-[0.05em] group-hover:border-black group-hover:text-black duration-300 cursor-pointer">
                        <p >Beli Sekarang</p>
                    </div>
                    <Link href={location} className="border-2 border-white rounded-[0.5em] text-white font-nunito text-[1em] font-normal px-[0.5em] py-[0.05em] group-hover:border-black group-hover:text-black duration-300 cursor-pointer">
                        <p>Detail</p>
                    </Link>
                </div>
            </div>

            <div className="font-nunito block text-black font-light relative h-[0em] group-hover:h-[7em] leading-[1.2em] duration-500 overflow-hidden z-[3]">
                {formatNews(desc, 180)}
            </div>
        </div>
    )
}

export default CardHover