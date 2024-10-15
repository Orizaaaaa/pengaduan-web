'use client'

import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import { postImage, postImagesArray } from '@/api/imagePost'
import { createProduct } from '@/api/shop'
import { bannerShop, camera } from '@/app/image'
import ButtonDelete from '@/components/elements/buttonDelete'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import CardHover from '@/components/elements/card/CardHover'
import DropdownCustom from '@/components/elements/dropdown/Dropdown'
import InputForm from '@/components/elements/input/InputForm'
import InputReport from '@/components/elements/input/InputReport'
import CaraoselImage from '@/components/fragemnts/caraoselProduct/caraoselProduct'
import ModalDefault from '@/components/fragemnts/modal/modal'
import Search from '@/components/fragemnts/search/Search'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { categoryCaraosel } from '@/utils/dataObject'
import { AutocompleteItem, useDisclosure } from '@nextui-org/react'
import Image from 'next/image'

import React, { useState } from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR, { mutate } from 'swr'


type Props = {}

const Page = (props: Props) => {
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


    return (
        <DefaultLayout>
            {/* headershop */}
            <div className="bg-[#FFC107] min-h-10 rounded-xl grid md:grid-cols-2 p-10 gap-5 md:gap-0">
                <div className="flex flex-col justify-center items-center">
                    <div className="text">
                        <h1 className=' text-xl md:text-2xl lg:text-3xl font-bold'>Gunakan Fitur  <span className='text-primary font-bold' >Toko Online</span>  untuk
                            memudahkan anda menjual sesuatu </h1>
                        <h2 className='text-slate-400 font-light' >Pesanan Online dibuat mudah,dan cepat </h2>
                        <ButtonPrimary className='py-1 px-2 rounded-md mt-4' onClick={openModalCreate} >Tambah Produk</ButtonPrimary>
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
                                    <Image className="w-full h-full object-cover" src={item.image} alt="shop1" />
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
                {dataShop?.map((item: any, index: number) => (
                    <CardHover location={`/dashboard-super-admin/shop/` + item._id} key={index} title={item.name} desc={item.description} image={item?.image[0]} price={item.price} />
                ))}
            </div>

            <ModalDefault isOpen={isOpen} onClose={onClose}>
                <div>
                    <CaraoselImage>
                        {form.image.length > 0 ? (
                            form.image.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <>
                                        <div className="flex justify-center items-center " style={{ pointerEvents: 'none' }}>
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt={`preview-${index}`}
                                                className="w-auto h-[100px] relative"
                                            />
                                        </div>
                                        <button onClick={() => deleteArrayImage(index, 'add')} className="button-delete array image absolute top-0 right-0 z-10 "  ><IoCloseCircleOutline color="red" size={34} /></button>
                                    </>
                                </SwiperSlide>
                            ))
                        ) : (
                            <div className='flex justify-center'>
                                <Image className="w-auto h-[100px] relative " src={camera} alt="image"></Image>
                            </div>
                        )}
                    </CaraoselImage>

                    <div className="grid grid-cols-2 justify-between my-1 gap-2">
                        <ButtonPrimary className='rounded-md relative cursor-pointer py-1 px-2' >Tambah Image
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                id="image-input-add"
                                onChange={(e) => handleImageChange(e, 'add')}
                            />
                        </ButtonPrimary>
                        <ButtonSecondary className='rounded-md  py-1 px-2' onClick={() => setForm(prevForm => ({ ...prevForm, image: [] }))} >Hapus Semua</ButtonSecondary>
                    </div>

                </div>
                <InputForm marginDiown='mb-0' styleTitle='font-medium' className='bg-slate-300' title='Nama Produk' htmlFor='name' type='text' value={form.name} onChange={handleChange} />

                <div className="flex gap-4 items-center">
                    <div className="dropdown ">
                        <h1 className='font-medium' >Kategori</h1>
                        <DropdownCustom clearButton={false} defaultItems={dataDropdown()} onSelect={(e: any) => onSelectionChange(e)}>
                            {(item: any) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                        </DropdownCustom>
                    </div>
                    <InputForm marginDiown='mb-0' styleTitle='font-medium' className='bg-slate-300 h-9' title='Kuantitas' htmlFor='quantity' type='text' value={form.quantity} onChange={handleChange} />
                </div>

                <div className="flex gap-4 items-center">
                    <InputForm marginDiown='mb-0' styleTitle='font-medium' className='bg-slate-300' title='Lokasi' htmlFor='address' type='text' value={form.address} onChange={handleChange} />
                    <InputForm marginDiown='mb-0' styleTitle='font-medium' className='bg-slate-300' title='Deskripsi' htmlFor='description' type='text' value={form.description} onChange={handleChange} />
                </div>


                <InputForm marginDiown='mb-0' styleTitle='font-medium' className='bg-slate-300' title='Harga' htmlFor='price' type='text' value={form.price} onChange={handleChange} />
                <div className="flex justify-end gap-2">
                    <ButtonPrimary className='rounded-md  py-2 px-2' onClick={handleCreate} >Simpan</ButtonPrimary>
                    <ButtonDelete className='rounded-md  py-2 px-2' onClick={onClose} >Batal</ButtonDelete>
                </div>
                <p>{errorMsg}</p>
            </ModalDefault>
        </DefaultLayout>
    )
}

export default Page