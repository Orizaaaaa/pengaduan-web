
import React from 'react'
import Navbar from '../fragemnts/navbar/Navbar'
import Image from 'next/image'
import { human1, logo } from '@/app/image'
import ButtonPrimary from '../elements/buttonPrimary'
import { IoChatbubblesSharp } from 'react-icons/io5'
import { FaUsersGear } from 'react-icons/fa6'
import { FaCreditCard, FaGraduationCap } from "react-icons/fa6"
import { HiClipboardDocumentList, HiCursorArrowRays } from "react-icons/hi2"
import { IoIosPeople } from "react-icons/io"

type Props = {}

const LandingPage = (props: Props) => {
    const dataText = [
        {
            no: '#1',
            title: 'Registrasi Akun',
            subtitle: 'Mulailah perjalanan Anda dengan membuat akun di platform website Desa Garut. Cukup isi formulir pendaftaran untuk memulai.',
            icon: <IoIosPeople size={30} color="#024395" />
        },
        {
            no: '#2',
            title: 'Buat Laporan ',
            subtitle: 'Pilih dan buat laporan berdasarkan kategori yang sesuai',
            icon: <HiCursorArrowRays size={30} color="#024395" />
        },
        {
            no: '#3',
            title: 'Pengecekan Oleh Admin',
            subtitle: 'Laporan yang telah anda buat akan di tindak lanjuti oleh admin dan di selidiki sebelum di tugaskan ke pegawai. ',
            icon: <FaCreditCard size={20} color="#024395" />
        },
        {
            no: '#4',
            title: 'Pelaksanaan Pelaporan',
            subtitle: 'Kemudian admin akan menugaskan pelaksanaan pelaporan ke pegawai, sehingga pelaporan dapat ditindak lanjuti. dan pegawai akan selalu meng informasikan status kerjaan nya',
            icon: <FaGraduationCap size={25} color="#024395" />
        },
        {
            no: '#5',
            title: 'Laporan Selesai',
            subtitle: 'Ketika laporan selesai maka akan menginformasikan status kerjaan laporan terhadap pelapor, dan bisa menilai dan berkomentar terkait kinerja perusahaan',
            icon: <FaGraduationCap size={25} color="#024395" />
        },
    ]
    return (
        <>
            <Navbar />
            <section className=' container mx-auto min-h-[100vh] grid grid-cols-1 lg:grid-cols-5 items-center px-4 pt-5 md:px-20  overflow-x-hidden' >
                <div className="title col-span-3">
                    <h1 className='text-2xl lg:text-6xl font-bold' >Selamat Datang di website <span className='text-primary' >Desa Garut</span> </h1>
                    <p className='mt-5' >Masyarakat dapat mengadukan permasalahan yang terjadi di garut perihal keamanan, ketertiban umum, kesejahtraan
                        sosial, pemberdayaan masyarakat, pemerintahan, ekonomi dan pembangunan</p>
                    <ButtonPrimary className='py-2 px-4 mt-10 rounded-full'>Buat Laporan</ButtonPrimary>
                    <div className="flex gap-5 mt-2">
                        <div className="flex justify-start mt-3 gap-2">
                            <IoChatbubblesSharp size={24} color='#024395' />
                            <div className="flex-col font-semibold text-black">
                                <p>10</p>
                                <p>Total Pengaduan</p>
                            </div>
                        </div>

                        <div className="flex justify-start mt-3 gap-2">
                            <FaUsersGear size={24} color='#024395' />
                            <div className="flex-col font-semibold text-black">
                                <p>4</p>
                                <p>aduan yang telah di tindak lanjuti</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center col-span-2">
                    <Image src={logo} alt="logo" className='w-auto h-70' />
                </div>

            </section>

            <section className="container mx-auto">
                <div className="flex justify-center">
                    <hr className="border-3 rounded-md border-primary my-5 w-22" />
                </div>
                <div className="text-center text-2xl">
                    <h1 className="text-primary font-medium" >Alur Pengaduan</h1>
                    <h1 className="text-primary font-bold" >Bagaimana Membuat Pengaduan</h1>
                </div>


                <div>
                    <h1 className='text-center text-2xl md:text-5xl text-white font-extrabold md-2 md:mb-8 uppercase'>Alur Aduan</h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex justify-center items-center p-4 lg:p-0">
                        <Image src={human1} alt="manager" className="w-auto md:h-[500px]" />
                    </div>

                    <div className='py-3  w-full px-2 sm:px-0 '>
                        <div className='relative '>
                            {/* <!-- Vertical bar running through middle --> */}
                            <div className="hidden sm:block w-1 border-l-2 border-dashed border-primary absolute h-full ">
                            </div>
                            {dataText.map((item, index) => (
                                <div className={`  sm:mt-0 sm:mb-12`} key={index}>
                                    <div className='flex flex-col sm:flex-row items-center'>
                                        <div className={`rounded-full bg-white border-white shadow-2  border-4 w-11 h-11 absolute  flex justify-center items-center  ${index === 4 ? "md:bottom-0" : ""}  ${index === 0 ? "md:top-0" : ""}     transform lg:-translate-x-1/2 `}>
                                            {item.icon}
                                        </div>
                                        <div className='flex justify-start w-full mx-auto items-center'>
                                            <div className='w-full  sm:pl-8'>
                                                <div className='px-4 py-4 md:py-0 rounded transition-all duration-100 ease-out  '>
                                                    <h1 className=" text-xl font-semibold lg:text-xl lg:font-bold mt-8 md:mt-0" ><span className="text-primary" >{item.no}</span> {item.title}</h1>
                                                    <p className=" text-sm lg:text-base text-slate-500" >{item.subtitle}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            ))}


                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <hr className="border-3 rounded-md border-primary mb-5 w-22" />
                </div>
            </section >
        </>
    )
}

export default LandingPage