'use client'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import { deleteProduct } from '@/api/shop'
import { employe } from '@/app/image'
import ButtonDelete from '@/components/elements/buttonDelete'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ModalAlert from '@/components/fragemnts/modal/modalAlert'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { capitalizeWords, formatRupiah } from '@/utils/helper'
import { Spinner, useDisclosure } from '@nextui-org/react'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BiCategory } from 'react-icons/bi'
import { BsArchive } from 'react-icons/bs'
import { FaMapMarkerAlt, FaTrashAlt } from 'react-icons/fa'
import { FaPen } from 'react-icons/fa6'
import { Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR from 'swr'

type Props = {}

const Page = (props: Props) => {
    const idProduct: any = useParams().id
    const { data, error } = useSWR(`${url}/shop/${idProduct}`, fetcher, {
        keepPreviousData: true,
    });
    const [loadingDelete, setLoadingDelete] = useState(false)
    const { isOpen: isWarningOpen, onOpen: onWarningOpen, onClose: onWarningClose } = useDisclosure();
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    const openModalDelete = () => {
        onWarningOpen()
    }

    const router = useRouter()
    const handleDelete = () => {
        setLoadingDelete(true)
        deleteProduct(idProduct, (result: any) => {
            console.log(result);
            setLoadingDelete(false)
            router.push('/dashboard-super-admin/shop')
        })
    }

    const dataProduct = data?.data


    return (
        <DefaultLayout>
            <div className="min-h-[100vh] bg-white p-4 rounded-md">
                <div className="flex bg-white justify-end gap-3 p-2 rounded-lg ">
                    <FaTrashAlt className='cursor-pointer' color='red' onClick={openModalDelete} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="wrap">
                        <div className="max-w-lg mx-auto">
                            {/* Main Swiper for the large image */}
                            <Swiper
                                spaceBetween={10}
                                navigation={true}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[Navigation, Thumbs]}
                                className="mb-4"
                            >
                                {dataProduct?.image.map((img: string, index: number) => (
                                    <SwiperSlide key={index}>
                                        <div className="w-full h-55">
                                            <img src={img} alt={`Slide ${index}`} className="w-full h-full  object-cover rounded-md" />
                                        </div>

                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Thumbnail Swiper */}
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={4}
                                watchSlidesProgress={true}
                                modules={[Thumbs]}
                                className="swiper-thumbs"
                            >
                                {dataProduct?.image.map((img: string, index: number) => (
                                    <SwiperSlide key={index}>
                                        <div className="h-30 w-full">
                                            <img src={img} alt={`Thumb ${index}`} className="w-full h-full object-cover cursor-pointer rounded-md" />
                                        </div>

                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        <div className="flex justify-end mt-3 ">
                            <ButtonPrimary className='py-1 px-2 rounded-md'>
                                Beli Sekarang
                            </ButtonPrimary>
                        </div>


                    </div>


                    <div className="text">
                        <div className="title space-y-2">
                            <h1 className='text-xl font-semibold' >{dataProduct?.name}</h1>
                            <h1 className='text-xl font-semibold' >{formatRupiah(dataProduct?.price)}</h1>
                        </div>
                        <div className="adress mt-3">
                            <div className="flex items-center gap-3">
                                <BiCategory size={20} />
                                <p> {dataProduct?.category} </p>
                            </div>
                        </div>
                        <div className="adress mt-3">
                            <div className="flex items-center gap-3">
                                <FaMapMarkerAlt size={20} />
                                <p> {dataProduct?.address}</p>
                            </div>
                        </div>
                        <div className="adress mt-3">
                            <div className="flex items-center gap-3">
                                <BsArchive size={20} />
                                <p> {dataProduct?.quantity} </p>
                            </div>
                        </div>


                        <div className="desc mt-3">
                            <h1 className='text-lg font-semibold' >Deskripsi</h1>
                            <p>{dataProduct?.description}</p>
                        </div>

                        <div className="user mt-3 border-black border-2 p-2 rounded-md ">
                            <div className="flex gap-3">
                                <div className="w-15 h-15">
                                    <img className='rounded-full object-cover w-full h-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaNkwLyEyzTkzMxP-UkOMaOArlSmqK6O9GFw&s' alt="user" />
                                </div>
                                <div className="text">
                                    <h1 className='font-medium'> {capitalizeWords(dataProduct?.user?.name)} </h1>
                                    <p className='text-slate-500'> {dataProduct?.user?.number_phone} </p>
                                </div>
                            </div>

                        </div>
                    </div>



                </div>
            </div>

            <ModalAlert isOpen={isWarningOpen} onClose={onWarningClose}>
                <h1>Apakah anda ingin menghapus produk tersebut ?</h1>
                <div className="flex gap-3 justify-end">
                    <ButtonPrimary onClick={onWarningClose} className='px-4 py-2 rounded-md'>Batal</ButtonPrimary>
                    <ButtonDelete onClick={handleDelete} className='px-4 py-2 rounded-md flex justify-center items-center'>{loadingDelete ? <Spinner className={`w-5 h-5 mx-8`} size="sm" color="white" /> : 'Ya, Hapus'}</ButtonDelete>
                </div>
            </ModalAlert>

        </DefaultLayout>
    )
}

export default Page