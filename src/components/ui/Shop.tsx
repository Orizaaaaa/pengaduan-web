'use client'
import Navbar from '../fragemnts/navbar/Navbar'
import { Autocomplete, AutocompleteItem, useDisclosure } from '@nextui-org/react'
import { categoryCaraosel, kategoriShop } from '@/utils/dataObject'
import Search from '../fragemnts/search/Search'
import Image from 'next/image'
import { bgPengaduan, employe, headerShop, human1, shop1, shop2, shop3, shop4 } from '@/app/image'
import { IoPersonSharp } from 'react-icons/io5'
import ButtonPrimary from '../elements/buttonPrimary'
import { HiMapPin } from 'react-icons/hi2'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import ButtonSecondary from '../elements/buttonSecondary'
import ModalDefault from '../fragemnts/modal/modal'
import { title } from 'process'
import CardHover from '../elements/card/CardHover'
import useSWR from 'swr'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'


type Props = {}

const Shop = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data, error } = useSWR(`${url}/shop/list`, fetcher, {
        keepPreviousData: true,
    });

    const dataShop = data?.data
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


                {/* categories 2 */}
                <section className='my-20' >
                    <h1 className='text-2xl font-bold my-10'>Kategori</h1>
                    <Swiper
                        slidesPerView={7} // Jumlah default slide yang ditampilkan
                        spaceBetween={30}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        loop={true} // Membuat slide menjadi infinite loop
                        breakpoints={{
                            // Saat lebar layar >= 1024px
                            1024: {
                                slidesPerView: 7, // 6 slide
                                spaceBetween: 30,
                            },
                            // Saat lebar layar >= 768px
                            768: {
                                slidesPerView: 2, // 2 slide
                                spaceBetween: 20,
                            },
                            // Untuk layar <= 640px, 1 slide akan ditampilkan
                            0: {
                                slidesPerView: 1, // 1 slide
                                spaceBetween: 10,
                            },
                        }}
                        modules={[Autoplay]}
                        className="mySwiper"
                    >

                        {categoryCaraosel.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex flex-col justify-center items-center">
                                    <div className="w-40 h-40 rounded-full overflow-hidden">
                                        <Image className="w-full h-full object-cover" src={item.image} alt="shop1" />
                                    </div>
                                    <p className='text-center mt-2 text-sm' >{item.title}</p>
                                </div>
                            </SwiperSlide>
                        ))}

                    </Swiper>

                </section>


                {/* product */}
                <section >
                    <div className="filtered space-y-3 md:space-y-0 md:flex justify-between w-full items-center gap-10">
                        <h1 className='text-2xl font-bold my-10'>Produk</h1>
                        <div className="w-full md:w-auto"> {/* Membatasi lebar search di layar besar */}
                            <Search className='border-2 border-black' placeholder="Cari Produk" />
                        </div>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-7">

                        <CardHover price={1000000} desc='A clean look for a young squad who have their sights set on the very top. Standing out
                 over those timeless home colours, a simple heat-applied cannon crest is the star of this Arsenal authentic jersey from adidas. 
                 Stay-cool HEAT.RDY and soft doubleknit fabric combine to keep Gunners players pushing for more on the football pitch. This product
                  is made with 100% recycled materials. By reusing materials that have already been created, we help to reduce waste and our
                   reliance on finite resources and reduce the footprint of the products we make.'
                            title='Arsenal Jersey' image='https://preview.thenewsmarket.com/Previews/ADID/StillAssets/800x600/662664.jpg' />

                        {dataShop?.map((item: any, index: number) => (
                            <CardHover key={index} title={item.name} desc={item.description} image={item?.image[0]} price={item.price} />
                        ))}
                    </div>
                </section>





                <ModalDefault onClose={onClose} isOpen={isOpen}>
                    <h1 className='text-xl font-semibold'>Domba</h1>
                </ModalDefault>
            </section>
        </>

    )
}

export default Shop