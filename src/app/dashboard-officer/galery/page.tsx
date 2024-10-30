'use client'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import { createGalery, deleteGalery, updateGalery } from '@/api/galery'
import { postImagesArray } from '@/api/imagePost'
import { camera, headerShop } from '@/app/image'
import ButtonDelete from '@/components/elements/buttonDelete'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import CaraoselImage from '@/components/fragemnts/caraoselProduct/caraoselProduct'
import ModalDefault from '@/components/fragemnts/modal/modal'
import ModalAlert from '@/components/fragemnts/modal/modalAlert'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { AnyCalendarDate } from '@internationalized/date'
import { Spinner, useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'
import { FaPen } from 'react-icons/fa6'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR, { mutate } from 'swr'

type Props = {}

const GaleryAdmin = (props: Props) => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { isOpen: isWarningOpen, onOpen: onWarningOpen, onClose: onWarningClose } = useDisclosure();
    const { isOpen: isUpdateOpen, onOpen: onUpdateOpen, onClose: onUpdateClose } = useDisclosure();
    const [loading, setLoading] = React.useState(false)
    const [loadingDelete, setLoadingDelete] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState({
        image: '',
        imageUpdate: ''
    })

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
        const selectedImage = e.target.files?.[0];

        if (!selectedImage) {
            console.log('No file selected');
            return;
        }

        if (InputSelect === 'add') {
            // Validasi tipe file
            const allowedTypes = ['image/png', 'image/jpeg'];
            if (!allowedTypes.includes(selectedImage.type)) {
                setErrorMsg((prev) => ({
                    ...prev,
                    image: '*Hanya file PNG dan JPG yang diperbolehkan',
                }));
                return;
            }

            // Validasi ukuran file (dalam byte, 5MB = 5 * 1024 * 1024)
            const maxSize = 5 * 1024 * 1024;
            if (selectedImage.size > maxSize) {
                setErrorMsg((prev) => ({
                    ...prev,
                    image: '*Ukuran file maksimal 5 MB',
                }));
                return;
            }

            // Hapus pesan error jika file valid
            setErrorMsg((prev) => ({
                ...prev,
                image: '',
            }));

            // Update state form dengan file yang valid
            setForm((prevState) => ({
                ...prevState,
                name: [...prevState.name, selectedImage],
            }));
        } else {

            // Validasi tipe file
            const allowedTypes = ['image/png', 'image/jpeg'];
            if (!allowedTypes.includes(selectedImage.type)) {
                setErrorMsg((prev) => ({
                    ...prev,
                    imageUpdate: '*Hanya file PNG dan JPG yang diperbolehkan',
                }));
                return;
            }

            // Validasi ukuran file (dalam byte, 5MB = 5 * 1024 * 1024)
            const maxSize = 5 * 1024 * 1024;
            if (selectedImage.size > maxSize) {
                setErrorMsg((prev) => ({
                    ...prev,
                    imageUpdate: '*Ukuran file maksimal 5 MB',
                }));
                return;
            }

            // Hapus pesan error jika file valid
            setErrorMsg((prev) => ({
                ...prev,
                imageUpdate: '',
            }));


            // Update state formUpdate tanpa validasi
            setFormUpdate((prevState) => ({
                ...prevState,
                name: [...prevState.name, selectedImage],
            }));
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
        setLoading(true);
        // Cek apakah array `form.name` kosong
        if (form.name.length === 0) {
            setErrorMsg((prev) => ({
                ...prev,
                image: '*Gambar tidak boleh kosong',
            }));
            setLoading(false);
        } else {
            try {
                // Kirim gambar dan dapatkan URL-nya
                const urls: string[] = await postImagesArray({ images: form.name });

                // Buat data baru dengan URL gambar yang telah diunggah
                const data = {
                    ...form,
                    name: urls,
                };

                // Buat galeri dengan data yang telah diperbarui
                createGalery(data, (status: any, result: any) => {
                    if (status) {
                        console.log(result);
                        mutate(`${url}/gallery/list`)
                        setLoading(false);
                        setForm({
                            name: [] as File[],
                        });
                        onClose();
                    }
                });
            } catch (error) {
                console.error("Error creating gallery:", error);
            }
        }
    };


    const openModalCreate = () => {
        onOpen()
    }

    // action update
    const openModalUpdate = (id: any, data: any) => {
        setId(id);
        onUpdateOpen()
        setFormUpdate({
            ...form, name: data.name // Mengambil data.name yang berisi URL gambar
        });
    };


    const handleUpdate = async () => {
        if (formUpdate.name.length === 0) {
            setErrorMsg((prev) => ({
                ...prev,
                imageUpdate: '*Gambar tidak boleh kosong',
            }));
            setLoading(false);
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
                mutate(`${url}/gallery/list`)
            });

            onUpdateClose()
        }
    };



    // action delete
    const openModalDelete = (id: any) => {
        setId(id)
        onWarningOpen()
    }

    const handleDelete = async () => {
        setLoadingDelete(true)
        await deleteGalery(id, (status: any, result: any) => {
            if (status) {
                mutate(`${url}/gallery/list`)
                setLoadingDelete(false)
                onWarningClose()
            }
        })
    }

    console.log(dataImage);


    return (
        <DefaultLayout>

            <section className='header-shop' >
                <Swiper
                    slidesPerView={1} // Jumlah default slide yang ditampilkan
                    spaceBetween={0}
                    pagination={{
                        clickable: true, // Pagination akan bisa diklik
                    }}
                    autoplay={{
                        delay: 3000, // Waktu tunda antara slide dalam milidetik
                        disableOnInteraction: false, // Melanjutkan autoplay meskipun pengguna berinteraksi
                    }}
                    modules={[Pagination, Autoplay]} // Tambahkan Autoplay ke dalam modul
                    className="mySwiper"
                >

                    {dataImage?.map((headerShop: any) => (
                        headerShop?.name?.map((item: any, index: number) => (
                            <SwiperSlide key={index} >
                                <div className="images h-[60vh] w-full relative">
                                    <img className='rounded-lg w-full h-full object-cover' src={item} alt='header' />
                                    {/* Overlay Hitam */}
                                    <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
                                </div>

                            </SwiperSlide>
                        ))
                    ))}
                </Swiper>
            </section>


            {/* list gambar */}
            <section className="image-list mt-4">

                <ButtonPrimary onClick={openModalCreate} className='py-2 px-3 rounded-lg my-3' >Tambah Galeri</ButtonPrimary>

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
            <ModalDefault isOpen={isUpdateOpen} onClose={onUpdateClose}>
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


                    <div className="grid grid-cols-2 justify-between gap-2 mt-5">
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

                    <p className='text-red text-sm my-2' >{errorMsg.imageUpdate}</p>

                    <ButtonPrimary className='w-full py-2 rounded-md' onClick={handleUpdate}>Kirim</ButtonPrimary>
                </div>
            </ModalDefault>

            {/* modal create */}

            <ModalDefault isOpen={isOpen} onClose={onClose}>
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

                    <div className="grid grid-cols-2 justify-between mt-5 gap-2">
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
                    <p className='text-red text-sm my-2' >{errorMsg.image}</p>
                    <ButtonPrimary onClick={handleCreate}
                        className='px-4 py-2 rounded-md flex justify-center items-center w-full'
                    >{loading ? <Spinner className={`w-5 h-5 mx-8`} size="sm" color="white" /> : 'Simpan'}</ButtonPrimary>
                </div>
            </ModalDefault>


            <ModalAlert isOpen={isWarningOpen} onClose={onWarningClose}>
                Apakah anda yakin akan menghapus data geleri tersebut ?
                <div className="flex justify-end gap-3">
                    <ButtonPrimary className='py-2 px-3 rounded-md' onClick={onWarningClose}> Batal</ButtonPrimary>
                    <ButtonDelete onClick={handleDelete}
                        className='px-4 py-2 rounded-md flex justify-center items-center'
                    >{loadingDelete ? <Spinner className={`w-5 h-5 mx-8`} size="sm" color="white" /> : 'Ya, Hapus'}</ButtonDelete>
                </div>
            </ModalAlert>

        </DefaultLayout>
    )
}

export default GaleryAdmin