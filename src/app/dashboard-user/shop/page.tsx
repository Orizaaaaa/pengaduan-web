'use client'
import { url } from '@/api/auth';
import { fetcher } from '@/api/fetcher';
import { postImagesArray } from '@/api/imagePost';
import { createProduct } from '@/api/shop';
import { bannerShop } from '@/app/image';
import ButtonPrimary from '@/components/elements/buttonPrimary';
import CardHover from '@/components/elements/card/CardHover';
import Search from '@/components/fragemnts/search/Search';
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { categoryCaraosel } from '@/utils/dataObject';
import { useDisclosure } from '@nextui-org/react';
import Image from 'next/image';
import React, { useState } from 'react'
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR, { mutate } from 'swr';

type Props = {}

const Page = (props: Props) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('Semua Kategori');
    const [searchData, setSearchData] = useState("");
    const [loading, setLoading] = useState(false)
    const idUser: string = localStorage.getItem('id') || '';
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { data, error } = useSWR(`${url}/shop/list`, fetcher, {
        keepPreviousData: true,
    });
    const [errorMsg, setErrorMsg] = useState('')
    const [form, setForm] = useState({
        name: '',
        description: '',
        address: '',
        price: '',
        image: [] as File[],
        category: '',
        quantity: '',
        user: idUser
    })
    const dataShop = data?.data

    const openModalCreate = () => {
        onOpen()
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        if (name === 'price' || name === 'quantity') {
            setForm({
                ...form,
                [name]: value === '' ? '' : Number(value) // Konversi ke number jika ada nilai
            });
        } else {
            setForm({
                ...form,
                [name]: value // Tetap sebagai string untuk field lainnya
            });
        }
    };

    const dataDropdown = () => {
        return categoryCaraosel
            .filter(category => category.title !== 'Semua Kategori') // Menghilangkan 'Semua Kategori'
            .map((category) => ({
                label: category.title,
                value: category.title,
            }));
    };


    const onSelectionChange = (key: string) => {
        setForm({ ...form, category: key })  // Menyimpan nilai yang dipilih ke dalam state
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, InputSelect: string) => {
        if (InputSelect === 'add') {
            const selectedImage = e.target.files?.[0];
            if (selectedImage) {
                setForm(prevState => ({
                    ...prevState,
                    image: [...prevState.image, selectedImage]
                }));
            }
        }
    };

    const deleteArrayImage = (index: number, type: string) => {
        if (type === 'add') {
            setForm(prevState => ({
                ...prevState,
                image: prevState.image.filter((_, i) => i !== index)
            }));
        }


    };

    const handleCreate = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const imageUrl: string[] = await postImagesArray({ images: form.image })
        const data = {
            ...form,
            image: imageUrl
        };
        if (imageUrl) {
            createProduct(data, (result: any) => {
                console.log(result);
                mutate(`${url}/shop/list`)
                onClose();
                setLoading(false);
            })
        }
    }

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

    return (
        <DefaultLayout>

            {/* headershop */}
            <div className="bg-[#FFC107] min-h-10 rounded-xl grid md:grid-cols-2 p-10 gap-5 md:gap-0">
                <div className="flex flex-col justify-center items-center">
                    <div className="text">
                        <h1 className=' text-xl md:text-2xl lg:text-3xl font-bold'>Gunakan Fitur  <span className='text-primary font-bold' >Toko Online</span>  untuk
                            memudahkan anda menjual sesuatu </h1>
                        <h2 className='text-slate-400 font-light' >Pesanan Online dibuat mudah,dan cepat </h2>
                        <ButtonPrimary className='py-1 px-2 rounded-md mt-4' >Tambah Produk</ButtonPrimary>
                    </div>
                </div>
                <div className="image order-first md:order-last">
                    <Image className='h-64' src={bannerShop} alt='bannershop' />
                </div>

            </div>

            {/* categories 2 */}
            <section className='my-10' >
                <h1 className='text-2xl font-bold my-10'>Kategori</h1>
                <Swiper
                    slidesPerView={6} // Jumlah default slide yang ditampilkan
                    spaceBetween={30}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true} // Membuat slide menjadi infinite loop
                    breakpoints={{
                        // Saat lebar layar >= 1024px
                        1024: {
                            slidesPerView: 6, // 6 slide
                            spaceBetween: 30,
                        },
                        // Saat lebar layar >= 768px
                        768: {
                            slidesPerView: 2, // 2 slide
                            spaceBetween: 20,
                        },
                        // Untuk layar <= 640px, 1 slide akan ditampilkan
                        0: {
                            slidesPerView: 2, // 1 slide
                            spaceBetween: 10,
                        },
                    }}
                    modules={[Autoplay]}
                    className="mySwiper"
                >

                    {categoryCaraosel.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col justify-center items-center">
                                <div className="w-30 h-30 rounded-full overflow-hidden">
                                    <Image onClick={() => handleCategoryClick(item.title)} className="w-full h-full object-cover cursor-pointer" src={item.image} alt="shop1" />
                                </div>
                                <p className='text-center mt-2 text-sm' >{item.title}</p>
                            </div>
                        </SwiperSlide>
                    ))}

                </Swiper>

            </section>

            <div className="filtered space-y-3 md:space-y-0 md:flex justify-between w-full items-center gap-10">
                <h1 className='text-2xl font-bold my-10'>Produk</h1>
                <div className="w-full md:w-auto"> {/* Membatasi lebar search di layar besar */}
                    <Search className='border-2 border-black' placeholder="Cari Produk" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 my-7">
                {filteredData?.map((item: any, index: number) => (
                    <CardHover location={`/dashboard-super-admin/shop/` + item._id} key={index} title={item.name} desc={item.description} image={item?.image[0]} price={item.price} />
                ))}
            </div>

        </DefaultLayout>
    )
}

export default Page