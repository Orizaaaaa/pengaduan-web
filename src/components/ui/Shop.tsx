'use client'
import Navbar from '../fragemnts/navbar/Navbar'
import { Autocomplete, AutocompleteItem, useDisclosure } from '@nextui-org/react'
import { kategoriShop } from '@/utils/dataObject'
import Search from '../fragemnts/search/Search'
import Image from 'next/image'
import { bgPengaduan, human1 } from '@/app/image'
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