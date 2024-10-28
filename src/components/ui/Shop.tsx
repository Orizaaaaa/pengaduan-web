'use client'
import Navbar from '../fragemnts/navbar/Navbar'
import { categoryCaraosel } from '@/utils/dataObject'
import Search from '../fragemnts/search/Search'
import Image from 'next/image'
import { headerShop } from '@/app/image'
import ButtonPrimary from '../elements/buttonPrimary'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import CardHover from '../elements/card/CardHover'
import useSWR from 'swr'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Skeleton } from '@nextui-org/react'
import SekeletonReport from '../fragemnts/sekeleton/SekeletonReport'
import Footer from '../fragemnts/LandingPage/footer/Footer'
import SearchNotFound from '../fragemnts/SearchNotFound/SearchNotFound'


type Props = {}

const Shop = (props: Props) => {
    const pathName = usePathname()
    const [selectedCategory, setSelectedCategory] = useState<string>('Semua Kategori');
    const [searchData, setSearchData] = useState("");
    const { data, error } = useSWR(`${url}/shop/list`, fetcher, {
        keepPreviousData: true,
    });
    const dataShop = data?.data


    const handleSearch = (e: any) => {
        setSearchData(e.target.value);
    };


    // Fungsi untuk menangani klik kategori
    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    // Filter data berdasarkan kategori yang dipilih
    const filteredData = dataShop?.filter((item: any) => {
        const isCategoryMatch = selectedCategory === 'Semua Kategori' || item.category === selectedCategory;
        const isSearchMatch = item.name.toLowerCase().includes(searchData.toLowerCase()) ||
            item.description.toLowerCase().includes(searchData.toLowerCase());
        return isCategoryMatch && isSearchMatch;
    });


    const sendWa = ({ name, productName, description, price, address, phone }: { name: string, productName: string, description: string, price: number, address: string, phone: string }) => {
        const message = `Hallo ${name}, saya tertarik dengan produk Anda: 
        *${productName}* 
        - Deskripsi: ${description}
        - Harga: Rp${price.toLocaleString()}
        - Lokasi: ${address}
        
        Apakah produk ini masih tersedia?`;

        const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    };



    console.log(dataShop);


    const router = useRouter()

    const isLoading = !data && !error

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
                                    <a className='mt-4 px-4 py-2 rounded-full bg-primary text-white' href="#product">Beli Sekarang</a>
                                    <button className='mt-4 px-4 py-2 rounded-full bg-black text-white' onClick={() => router.push('/register')} >Daftar Sekarang</button>
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

                        {isLoading ? (
                            <>
                                {
                                    Array.from({ length: 7 }).map((_, index) => (
                                        <SwiperSlide key={index}>
                                            <div className='flex flex-col justify-center items-center gap-2'>
                                                <Skeleton className="flex rounded-full w-[70px] h-[70px]" />
                                                <Skeleton className="h-4 w-20 rounded-lg" />
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </>
                        ) : (
                            categoryCaraosel.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="w-30 h-30 rounded-full overflow-hidden">
                                            <Image onClick={() => handleCategoryClick(item.title)} className="w-full h-full object-cover cursor-pointer" src={item.image} alt="shop1" />
                                        </div>
                                        <p className='text-center mt-2 text-sm'>{item.title}</p>
                                    </div>
                                </SwiperSlide>
                            ))
                        )}

                    </Swiper>

                </section>


                {/* product */}
                <section >
                    <div className="filtered space-y-3 md:space-y-0 md:flex justify-between w-full items-center gap-10">
                        <h1 className='text-2xl font-bold my-10'>Produk</h1>
                        <div className="w-full md:w-auto"> {/* Membatasi lebar search di layar besar */}
                            <Search onChange={handleSearch} className='border-2 border-black' placeholder="Cari Produk" />
                        </div>
                    </div>


                    <div id='product' className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-7">


                        {isLoading ? (

                            Array.from({ length: 6 }).map((_, index) => (
                                <SekeletonReport key={index} />
                            ))

                        ) :
                            filteredData?.map((item: any, index: number) => (
                                <CardHover
                                    onBuy={() => sendWa({
                                        name: item.name,
                                        productName: item.user.name,
                                        description: item.description,
                                        price: item.price,
                                        address: item.address,
                                        phone: item.user.number_phone
                                    })}
                                    location={`${pathName}/` + item._id} key={index} title={item.name} desc={item.description} image={item?.image[0]} price={item.price} />
                            ))}


                    </div>

                    {!isLoading && (!filteredData || filteredData.length === 0) && (
                        <div className="w-full flex items-center justify-center">
                            <SearchNotFound text="Produk tidak ditemukan" height="300px" width="300px" />
                        </div>
                    )}
                </section>


            </section>

            <Footer />
        </>

    )
}

export default Shop