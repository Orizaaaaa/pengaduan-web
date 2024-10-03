import Navbar from '@/components/fragemnts/navbar/Navbar'
import React from 'react'
import { IoHome } from 'react-icons/io5'

type Props = {}

const page = (props: Props) => {
    return (
        <>
            {/* <Navbar /> */}
            <section className='container mx-auto py-10 px-5 mt-10 rounded-md hover:border-stroke bg-white shadow-default dark:border-strokedark'>
                <div className="flex items-center gap-3 border-b-2 border-dashed border-black">
                    <IoHome size={20} />
                    <h1 className='text-2xl font-bold'>Pembangunan aula kantor</h1>
                </div>
            </section>


        </>

    )
}

export default page