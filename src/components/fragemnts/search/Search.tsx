'use client'
import React, { useState } from 'react'
import { IoSearch } from 'react-icons/io5';

type Props = {
    placeholder: string
    className?: string
    onChange?: any
}

const Search = ({ placeholder, className, onChange }: Props) => {
    return (
        <div className="w-full relative ">
            <input onChange={onChange} className={` ${className} rounded-xl bg-white outline-none py-2 ps-11`} type="text" placeholder={placeholder} name="" id="" />
            <IoSearch size={20} color="black" className="absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
    )
}

export default Search