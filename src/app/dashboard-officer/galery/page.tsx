'use client'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import { createGalery, deleteGalery, updateGalery } from '@/api/galery'
import { postImagesArray } from '@/api/imagePost'
import { camera } from '@/app/image'
import ButtonDelete from '@/components/elements/buttonDelete'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import CaraoselImage from '@/components/fragemnts/caraoselProduct/caraoselProduct'
import ModalDefault from '@/components/fragemnts/modal/modal'
import ModalAlert from '@/components/fragemnts/modal/modalAlert'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'
import { FaPen } from 'react-icons/fa6'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR, { mutate } from 'swr'

type Props = {}

const page = (props: Props) => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { isOpen: isWarningOpen, onOpen: onWarningOpen, onClose: onWarningClose } = useDisclosure();
    const [id, setId] = React.useState('')
    const [form, setForm] = React.useState({
        name: [] as File[],
    })
    const [formUpdate, setFormUpdate] = React.useState({
        name: [] as File[],
    })

    const { data, error } = useSWR(`${url}/gallery/list`, fetcher, {
        keepPreviousData: true,
    });
    const dataImage = data?.data

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, InputSelect: string) => {
        if (InputSelect === 'add') {
            const selectedImage = e.target.files?.[0];
            if (selectedImage) {
                setForm(prevState => ({
                    ...prevState,
                    name: [...prevState.name, selectedImage]
                }));
            }
        } else {
            const selectedImage = e.target.files?.[0];
            if (selectedImage) {
                setFormUpdate(prevState => ({
                    ...prevState,
                    name: [...prevState.name, selectedImage]
                }));
            }
        }
    };

    const deleteArrayImage = (index: number, type: string) => {
        if (type === 'add') {
            setForm(prevState => ({
                ...prevState,
                name: prevState.name.filter((_, i) => i !== index)
            }));
        } else {
            setFormUpdate(prevState => ({
                ...prevState,
                name: prevState.name.filter((_, i) => i !== index)
            }));
        }

    };

    const handleCreate = async () => {
        if (!form.name) {
            console.log('tidak boleh kosong');
        } else {
            const urls: string[] = await postImagesArray({ images: form.name })
            const data = {
                ...form,
                name: urls
            }

            createGalery(data, (status: any, result: any) => {
                if (status) {
                    console.log(result);
                    setForm({
                        name: [] as File[],
                    })
                }
            })

        }
    }


    // action update
    const openModalUpdate = (id: any, data: any) => {
        setId(id);
        onOpen();
        setFormUpdate({
            ...form, name: data.name // Mengambil data.name yang berisi URL gambar
        });
    };


    const handleUpdate = async () => {
        if (!formUpdate.name || formUpdate.name.length === 0) {
            console.log('tidak boleh kosong');
        } else {
            // Pisahkan gambar yang berupa URL string dan File
            const existingUrls = formUpdate.name.filter((item: any): item is string => typeof item === 'string'); // Gambar lama (URL)
            const newFiles = formUpdate.name.filter((item: any): item is File => item instanceof File); // Gambar baru (File)

            // Upload gambar baru ke Cloudinary jika ada
            let uploadedUrls: string[] = [];
            if (newFiles.length > 0) {
                uploadedUrls = await postImagesArray({ images: newFiles });
            }

            // Gabungkan URL lama dengan URL baru yang di-upload
            const allUrls = [...existingUrls, ...uploadedUrls];

            // Data untuk dikirim ke update API
            const data = {
                ...formUpdate,
                name: allUrls,
            };

            // Panggil fungsi updateGalery untuk mengirim data
            updateGalery(id, data, (result: any) => {
                console.log(result);
                setFormUpdate({
                    name: [], // Reset formUpdate setelah berhasil update
                });
            });

            onClose();
        }
    };



    // action delete
    const openModalDelete = (id: any) => {
        setId(id)
        onWarningOpen()
    }

    const handleDelete = async () => {
        await deleteGalery(id, (status: any, result: any) => {
            if (status) {
                mutate(`${url}/gallery/list`)
                onWarningClose()
            }
        })
    }



    return (
        <DefaultLayout>

            {/* caraosel image input*/}
            <div>
                <CaraoselImage>
                    {form.name.length > 0 ? (
                        form.name.map((image, index) => (
                            <SwiperSlide key={index}>
                                <>
                                    <div className="flex justify-center items-center " style={{ pointerEvents: 'none' }}>
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`preview-${index}`}
                                            className="w-auto h-[200px] relative"
                                        />
                                    </div>
                                    <button onClick={() => deleteArrayImage(index, 'add')} className="button-delete array image absolute top-0 right-0 z-10 "  ><IoCloseCircleOutline color="red" size={34} /></button>
                                </>
                            </SwiperSlide>
                        ))
                    ) : (
                        <div className='flex justify-center'>
                            <Image className="w-auto h-[200px] relative " src={camera} alt="image"></Image>
                        </div>
                    )}
                </CaraoselImage>

                <div className="grid grid-cols-2 justify-between my-5 gap-2">
                    <ButtonPrimary className='rounded-md relative cursor-pointer py-2 px-1' >Tambah Image
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            id="image-input-add"
                            onChange={(e) => handleImageChange(e, 'add')}
                        />
                    </ButtonPrimary>
                    <ButtonSecondary className='rounded-md  py-2 px-1' onClick={() => setForm(prevForm => ({ ...prevForm, name: [] }))} >Hapus Semua</ButtonSecondary>
                </div>
                <ButtonPrimary className='w-full py-2 rounded-md' onClick={handleCreate} > Kirim  </ButtonPrimary>

            </div>


            {/* list gambar */}
            <section className="image-list mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4  gap-4">
                    {dataImage?.map((item: any, index: any) => (
                        <div className="cover group relative" key={index}>
                            <Swiper
                                spaceBetween={10}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination]}
                                className="mySwiper h-full rounded-lg"
                            >
                                {item.name?.map((image: any, index: any) => (
                                    <SwiperSlide key={index}>
                                        <div className="relative h-50">
                                            <img
                                                src={image} // Mengambil URL langsung dari `image`
                                                alt={`preview-${image}`}
                                                className="w-full h-full object-cover rounded-md"
                                            />

                                            {/* Tombol akan disembunyikan, tetapi muncul saat hover */}
                                            <div className="button-action-hover flex justify-center items-center gap-10">
                                                <button onClick={() => openModalUpdate(item._id, item)} className='absolute pt-2 top-0 right-10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300' >
                                                    <FaPen color='white' />
                                                </button>
                                                <button
                                                    onClick={() => openModalDelete(item._id)}
                                                    className="absolute top-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                >
                                                    <IoCloseCircleOutline color="red" size={34} />
                                                </button>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    ))}
                </div>
            </section>


            {/* modal update */}
            <ModalDefault isOpen={isOpen} onClose={onClose}>
                <div>
                    <CaraoselImage>
                        {formUpdate.name.length > 0 ? (
                            formUpdate.name.map((image: any, index: number) => (
                                <SwiperSlide key={index}>
                                    <>
                                        <div className="flex justify-center items-center" style={{ pointerEvents: 'none' }}>
                                            <img
                                                src={typeof image === 'string' ? image : URL.createObjectURL(image)} // Cek apakah image berupa string atau File
                                                alt={`preview-${index}`}
                                                className="w-auto h-[200px] relative"
                                            />
                                        </div>
                                        <button
                                            onClick={() => deleteArrayImage(index, 'update')}
                                            className="button-delete array-image absolute top-0 right-0 z-10"
                                        >
                                            <IoCloseCircleOutline color="red" size={34} />
                                        </button>
                                    </>
                                </SwiperSlide>
                            ))
                        ) : (
                            <div className="flex justify-center">
                                <Image className="w-auto h-[200px] relative" src={camera} alt="image" />
                            </div>
                        )}
                    </CaraoselImage>


                    <div className="grid grid-cols-2 justify-between my-5 gap-2">
                        <ButtonPrimary className='rounded-md relative cursor-pointer py-2 px-1'>
                            Tambah Image
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                id="image-input-add"
                                onChange={(e) => handleImageChange(e, 'update')}
                            />
                        </ButtonPrimary>
                        <ButtonSecondary
                            className='rounded-md py-2 px-1'
                            onClick={() => setFormUpdate(prevForm => ({ ...prevForm, name: [] }))}
                        >
                            Hapus Semua
                        </ButtonSecondary>
                    </div>
                    <ButtonPrimary className='w-full py-2 rounded-md' onClick={handleUpdate}>Kirim</ButtonPrimary>
                </div>
            </ModalDefault>


            <ModalAlert isOpen={isWarningOpen} onClose={onWarningClose}>
                Apakah anda yakin akan menghapus data geleri tersebut ?
                <div className="flex justify-end gap-3">
                    <ButtonPrimary className='py-2 px-3 rounded-md' onClick={onWarningClose}> Batal</ButtonPrimary>
                    <ButtonDelete className='py-2 px-3 rounded-md' onClick={handleDelete}>Ya, Hapus</ButtonDelete>
                </div>
            </ModalAlert>

        </DefaultLayout>
    )
}

export default page