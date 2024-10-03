'use client'
import Navbar from '../fragemnts/navbar/Navbar'
import { Autocomplete, AutocompleteItem, useDisclosure } from '@nextui-org/react'
import { kategoriShop } from '@/utils/dataObject'
import Search from '../fragemnts/search/Search'
import Image from 'next/image'
import { bgPengaduan, headerShop, human1 } from '@/app/image'
import { IoPersonSharp } from 'react-icons/io5'
import ButtonPrimary from '../elements/buttonPrimary'
import { HiMapPin } from 'react-icons/hi2'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import ButtonSecondary from '../elements/buttonSecondary'
import ModalDefault from '../fragemnts/modal/modal'


type Props = {}

const Shop = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const openDetail = () => {
        onOpen()
    }

    return (
        <>
            <Navbar />

            {/* header */}
            <section className='header-shop' >
                <Swiper
                    slidesPerView={1} // Jumlah default slide yang ditampilkan
                    spaceBetween={0}
                    pagination={{
                        clickable: true, // Pagination akan bisa diklik
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide >
                        <div className="images h-[80vh] w-full relative">
                            <Image className="rounded-t-lg w-full h-full object-cover" src={headerShop} alt="header" />
                            <div className="container mx-auto absolute flex flex-col justify-center items-center md:items-start inset-0  z-10">
                                <h1 className='text-3xl md:text-5xl' > <span className='text-primary font-extrabold'>Buah Dan Sayur</span> <span className='font-light'>dari desa kami</span> </h1>
                                <h1 className='text-3xl md:text-5xl font-extrabold'>Fresh</h1>
                                <p className='text-slate-500 mt-2 text-sm' >Buah buahan dan sayuran hasil dari desa kami</p>
                                <div className="flex gap-3 ">
                                    <ButtonPrimary className='mt-4 px-4 py-2 rounded-full' >Beli Sekarang</ButtonPrimary>
                                    <button className='mt-4 px-4 py-2 rounded-full bg-black text-white' >Daftar Sekarang</button>
                                </div>
                                <div className="flex items-center gap-10 mt-10 ">

                                    <div className="md:flex items-center gap-3">
                                        <h1 className=' text-xl md:text-3xl font-black'>14k+</h1>
                                        <div className="flex flex-col space-y-0 text-sm">
                                            <p className=' font-light' >VARIAN </p>
                                            <p className=' font-light' >PRODUK</p>
                                        </div>
                                    </div>
                                    <div className="md:flex items-center gap-3">
                                        <h1 className=' text-xl md:text-3xl font-black'>50k+</h1>
                                        <div className="flex flex-col space-y-0 text-sm">
                                            <p className=' font-light' >CUSTOMER </p>
                                            <p className=' font-light' >BAHAGIA</p>
                                        </div>
                                    </div>
                                    <div className="md:flex items-center gap-3 ">
                                        <h1 className=' text-xl md:text-3xl font-black'>10k+</h1>
                                        <div className="flex flex-col space-y-0 text-sm">
                                            <p className=' font-light' >SEMUA </p>
                                            <p className=' font-light' >PETANI</p>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>

                    </SwiperSlide>
                    <SwiperSlide >
                        <div className="images h-[80vh] w-full ">
                            <Image className='rounded-t-lg w-full h-full' src={headerShop} alt='header' />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>

            <section className='container mx-auto my-20'>
                <div className="filtered space-y-3 md:space-y-0 md:flex justify-center items-center gap-10">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-7">

                    <div className="rounded-md hover: border-stroke bg-white  shadow-default 
                      dark:border-strokedark ">
                        <Swiper
                            slidesPerView={1} // Jumlah default slide yang ditampilkan
                            spaceBetween={30}
                            pagination={{
                                clickable: true, // Pagination akan bisa diklik
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                        >
                            <SwiperSlide >
                                <div className="images h-[150px] ">
                                    <Image className='rounded-t-lg w-full h-full' src={bgPengaduan} alt="jalan rusak" />
                                </div>

                            </SwiperSlide>
                            <SwiperSlide >
                                <div className="images h-[150px] ">
                                    <Image className='rounded-t-lg w-full h-full' src={human1} alt="jalan rusak" />
                                </div>

                            </SwiperSlide>
                        </Swiper>

                        <div className="text px-2 py-1 space-y-1">
                            <h1 className=' text-sm ' >Domba</h1>
                            <h1 className='font-semibold'>Rp 1.000.000</h1>

                            <div className="flex  items-center gap-1">
                                <IoPersonSharp color='#94a3b8' size={15} />
                                <p className='text-sm text-slate-400' >ORIZA SATIVA</p>
                            </div>

                            <div className="flex  items-center gap-1">
                                <HiMapPin color='#94a3b8' size={15} />
                                <p className='text-small text-slate-400' >Kp. Tegalkiang No.1 Jawa Barat...</p>
                            </div>

                        </div>
                        <div className="flex px-2 justify-end py-2 items-center gap-3 mt-2">
                            <ButtonPrimary className='py-2 px-4   rounded-md text-sm lg:text-base'>Beli Sekarang</ButtonPrimary>
                            <ButtonSecondary onClick={openDetail} className='py-2 px-4   rounded-md text-sm lg:text-base' >Detail</ButtonSecondary>
                        </div>
                    </div>

                </div>

                <ModalDefault onClose={onClose} isOpen={isOpen}>
                    <h1 className='text-xl font-semibold'>Domba</h1>
                </ModalDefault>
            </section>
        </>

    )
}

export default Shop