'use client'
import React, { useState } from 'react'
import Navbar from '../fragemnts/navbar/Navbar'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { kategoriShop } from '@/utils/dataObject'
import Search from '../fragemnts/search/Search'
import CardLink from '../elements/card/CardLink'
import Image from 'next/image'
import { bgPengaduan } from '@/app/image'
import { MdOutlinePersonPin, MdOutlinePersonPinCircle } from 'react-icons/md'
import { IoPersonCircleSharp, IoPersonSharp } from 'react-icons/io5'
import ButtonPrimary from '../elements/buttonPrimary'
import { HiMapPin } from 'react-icons/hi2'

type Props = {}

const Shop = (props: Props) => {


    return (
        <>
            <Navbar />
            <section className='container mx-auto my-20'>
                <div className="filtered flex justify-center items-center gap-10">
                    <Autocomplete
                        aria-label='dropdown'
                        clearButtonProps={{ size: 'sm' }}
                        defaultItems={kategoriShop}
                        defaultSelectedKey={"semua kategori"}
                        className=" w-[100%] lg:max-w-xs border-2 border-black rounded-lg"
                        size='sm'
                    >
                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                    </Autocomplete>
                    <Search placeholder="Cari Produk" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-7">
                    <CardLink href="/">
                        <div className="images h-[150px] ">
                            <Image className='rounded-t-lg w-full h-full' src={bgPengaduan} alt="jalan rusak" />
                        </div>
                        <div className="text px-2 py-1 space-y-1">
                            <h1 className=' text-sm ' >Domba</h1>
                            <h1 className='font-semibold'>Rp 1.000.000</h1>

                            <div className="flex  items-center gap-1">
                                <IoPersonSharp color='#94a3b8' size={15} />
                                <p className='text-sm text-slate-400' >ORIZA SATIVA</p>
                            </div>

                            <div className="flex  items-center gap-1">
                                <HiMapPin color='#94a3b8' size={15} />
                                <p className='text-sm text-slate-400' >Kp. Tegalkiang No.1 Jawa Barat</p>
                            </div>

                        </div>
                        <div className="flex px-2 justify-end py-2 items-center">
                            <ButtonPrimary className='py-1 px-4  rounded-full'>Beli Sekarang</ButtonPrimary>
                        </div>
                    </CardLink>
                </div>
            </section>
        </>

    )
}

export default Shop