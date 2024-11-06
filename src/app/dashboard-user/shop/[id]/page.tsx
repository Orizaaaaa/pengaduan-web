'use client'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import { postImagesArray } from '@/api/imagePost'
import { deleteProduct, updateShop } from '@/api/shop'
import { camera, employe } from '@/app/image'
import ButtonDelete from '@/components/elements/buttonDelete'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import DropdownCustom from '@/components/elements/dropdown/Dropdown'
import InputForm from '@/components/elements/input/InputForm'
import CaraoselImage from '@/components/fragemnts/caraoselProduct/caraoselProduct'
import ModalDefault from '@/components/fragemnts/modal/modal'
import ModalAlert from '@/components/fragemnts/modal/modalAlert'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { categoryCaraosel } from '@/utils/dataObject'
import { capitalizeWords, formatRupiah } from '@/utils/helper'
import { AutocompleteItem, Spinner, useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiCategory } from 'react-icons/bi'
import { BsArchive } from 'react-icons/bs'
import { FaMapMarkerAlt, FaTrashAlt } from 'react-icons/fa'
import { FaPen } from 'react-icons/fa6'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR, { mutate } from 'swr'

type Props = {}

const Page = (props: Props) => {
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState({
        name: '',
        description: '',
        address: '',
        price: '',
        image: '',
        category: '',
        quantity: '',
    })

    const [idUser, setIdUser] = useState<string | null>(null);
    const idProduct: any = useParams().id
    const { data, error } = useSWR(`${url}/shop/${idProduct}`, fetcher, {
        keepPreviousData: true,
    });
    const [loadingDelete, setLoadingDelete] = useState(false)
    const { isOpen: isWarningOpen, onOpen: onWarningOpen, onClose: onWarningClose } = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();
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
            router.push('/dashboard-user/shop')
        })
    }

    const dataProduct = data?.data

    useEffect(() => {
        const userId = localStorage.getItem('id');
        if (userId) {
            setIdUser(userId)
        }
    }, []);

    const sendWa = () => {
        const message = `Hallo ${dataProduct.user.name}, saya tertarik dengan produk Anda: 
      *${dataProduct.name}* 
      - Deskripsi: ${dataProduct.description}
      - Harga: Rp${dataProduct.price.toLocaleString()}
      - Lokasi: ${dataProduct.address}
      
      Apakah produk ini masih tersedia?`;

        const whatsappLink = `https://wa.me/${dataProduct.user.number_phone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    };

    const [formUpdate, setFormUpdate] = useState(
        {
            name: '',
            description: '',
            address: '',
            price: '',
            image: [] as File[],
            category: '',
            quantity: '',
            user: '',
        }
    )

    const openModalUpdate = () => {
        onOpen()
        setFormUpdate({
            ...formUpdate,
            name: dataProduct.name,
            description: dataProduct.description,
            address: dataProduct.address,
            price: dataProduct.price,
            image: dataProduct.image,
            category: dataProduct.category,
            quantity: dataProduct.quantity,
            user: dataProduct.user._id,
        });
    }

    const dataDropdown = () => {
        return categoryCaraosel
            .filter(category => category.title !== 'Semua Kategori') // Menghilangkan 'Semua Kategori'
            .map((category) => ({
                label: category.title,
                value: category.title,
            }));
    };
    const onSelectionChange = (key: string) => {
        setFormUpdate({ ...formUpdate, category: key })  // Menyimpan nilai yang dipilih ke dalam state
    }

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
            setFormUpdate((prevState) => ({
                ...prevState,
                image: [...prevState.image, selectedImage],
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
                image: [...prevState.image, selectedImage],
            }));
        }
    };
    const handleChange = (e: any) => {
        const { name, value } = e.target;

        if (name === 'quantity') {
            // Hapus semua karakter selain angka
            let numericValue = value.replace(/\D/g, '');

            setErrorMsg((prev) => ({
                ...prev,
                quantity: '',
            }));

            // Update state dengan angka (konversi ke number)
            setFormUpdate((prevForm) => ({ ...prevForm, [name]: numericValue ? Number(numericValue) : '' }));
            return; // Menghentikan eksekusi lebih lanjut karena 'quantity' sudah di-handle
        }

        if (name === 'price') {
            // Hapus semua karakter selain angka
            let numericValue = value.replace(/\D/g, '');

            setErrorMsg((prev) => ({
                ...prev,
                price: '',
            }));

            // Update state dengan angka (konversi ke number)
            setFormUpdate((prevForm) => ({ ...prevForm, [name]: numericValue ? Number(numericValue) : '' }));
            return; // Menghentikan eksekusi lebih lanjut karena 'price' sudah di-handle
        }

        // Update state untuk input lainnya
        setFormUpdate((prevForm) => ({ ...prevForm, [name]: value }));
    }


    const deleteArrayImage = (index: number,) => {
        setFormUpdate(prevState => ({
            ...prevState,
            image: prevState.image.filter((_, i) => i !== index)
        }));
    };

    console.log(formUpdate);

    const handleUpdate = async () => {
        setLoading(true);

        // Validasi form tidak boleh kosong
        const newErrorMsg = {
            name: formUpdate.name === '' ? '*Nama tidak boleh kosong' : '',
            description: formUpdate.description === '' ? '*Deskripsi tidak boleh kosong' : '',
            address: formUpdate.address === '' ? '*Alamat tidak boleh kosong' : '',
            price: formUpdate.price === '' ? '*Harga tidak boleh kosong' : '',
            image: formUpdate.image.length === 0 ? '*Gambar tidak boleh kosong' : '',
            category: formUpdate.category === '' ? '*Kategori tidak boleh kosong' : '',
            quantity: formUpdate.quantity === '' ? '*Jumlah tidak boleh kosong' : '',
        };

        // Set error message jika ada field yang kosong
        setErrorMsg(newErrorMsg);

        // Cek apakah ada field yang kosong
        const isFormInvalid = Object.values(newErrorMsg).some((msg) => msg !== '');

        // Jika form tidak valid, hentikan proses
        if (isFormInvalid) {
            setLoading(false);
            return;
        }

        // Pisahkan gambar yang berupa URL string dan File
        const existingUrls = formUpdate.image.filter((item: any): item is string => typeof item === 'string'); // Gambar lama (URL)
        const newFiles = formUpdate.image.filter((item: any): item is File => item instanceof File); // Gambar baru (File)

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
            image: allUrls,
        };

        await updateShop(idProduct, data, (result: any) => {
            console.log(result);
            mutate(`${url}/shop/${idProduct}`);
            setLoading(false);
            onClose();
        });
    };





    return (
        <DefaultLayout>
            <div className="min-h-[100vh] bg-white p-4 rounded-md">
                <div className={`flex bg-white justify-end 
                    gap-3 p-2 rounded-lg ${dataProduct?.user?._id === idUser ? 'block' : 'hidden'}`} >
                    <FaPen className='cursor-pointer' color='blue' onClick={openModalUpdate} />
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
                                            <img
                                                src={img}
                                                alt={`Slide ${index}`}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Thumbnail Swiper */}
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={4} // default untuk desktop
                                breakpoints={{
                                    640: { slidesPerView: 2 }, // untuk layar lebih kecil
                                    768: { slidesPerView: 3 }, // untuk tablet
                                    1024: { slidesPerView: 4 }, // untuk desktop
                                }}
                                watchSlidesProgress={true}
                                modules={[Thumbs]}
                                className="swiper-thumbs"
                            >
                                {dataProduct?.image.map((img: string, index: number) => (
                                    <SwiperSlide key={index}>
                                        <div className="h-20 sm:h-24 md:h-30 w-full">
                                            <img
                                                src={img}
                                                alt={`Thumb ${index}`}
                                                className="w-full h-full object-cover cursor-pointer rounded-md"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>


                        <div className="user mt-10  ">
                            <div className="flex  gap-3">
                                <div className="w-15 h-15">
                                    <img className='rounded-full object-cover w-full h-full'
                                        src={dataProduct?.user?.image || 'https://i.pinimg.com/564x/0f/78/5d/0f785d55cea2a407ac8c1d0c6ef19292.jpg'}
                                        onError={(e: any) => {
                                            e.target.src = 'https://i.pinimg.com/564x/0f/78/5d/0f785d55cea2a407ac8c1d0c6ef19292.jpg';
                                        }} alt="user" />
                                </div>
                                <div className="text">
                                    <h1 className='font-medium'> {capitalizeWords(dataProduct?.user?.name)} </h1>
                                    <p className='text-slate-500'> {dataProduct?.user?.number_phone} </p>
                                </div>
                            </div>

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

                        <div className="flex  mt-5 gap-4 ">
                            <button onClick={() => router.back()} className='py-1 px-2 rounded-md border-2 border-primary text-primary' >
                                Kembali
                            </button>
                            <ButtonPrimary onClick={sendWa} className='py-1 px-2 rounded-md'>
                                Beli Sekarang
                            </ButtonPrimary>
                        </div>

                    </div>



                </div>
            </div>

            <ModalDefault isOpen={isOpen} onClose={onClose}>
                <div>
                    <CaraoselImage>
                        {formUpdate.image.length > 0 ? (
                            formUpdate.image.map((image: any, index: number) => (
                                <SwiperSlide key={index}>
                                    <>
                                        <div className="flex justify-center items-center" style={{ pointerEvents: 'none' }}>
                                            <img
                                                src={typeof image === 'string' ? image : URL.createObjectURL(image)} // Cek apakah image berupa string atau File
                                                alt={`preview-${index}`}
                                                className="w-auto h-[100px] relative"
                                            />
                                        </div>
                                        <button onClick={() => deleteArrayImage(index)}
                                            className="button-delete array-image absolute top-0 right-0 z-10"
                                        >
                                            <IoCloseCircleOutline color="red" size={34} />
                                        </button>
                                    </>
                                </SwiperSlide>
                            ))
                        ) : (
                            <div className="flex justify-center">
                                <Image className="w-auto h-[100px] relative" src={camera} alt="image" />
                            </div>
                        )}
                    </CaraoselImage>
                    <p className='text-red text-sm my-2' >{errorMsg.image}</p>
                    <div className="grid grid-cols-2 justify-between mt-5 gap-2">
                        <ButtonPrimary className='rounded-md relative cursor-pointer py-2 px-1' >Tambah Image
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                id="image-input-add"
                                onChange={(e) => handleImageChange(e, 'add')}
                            />
                        </ButtonPrimary>
                        <ButtonSecondary className='rounded-md  py-2 px-1' onClick={() => setFormUpdate(prevForm => ({ ...prevForm, image: [] }))} >Hapus Semua</ButtonSecondary>
                    </div>
                </div>

                <InputForm errorMsg={errorMsg.name} marginDiown='mb-0' styleTitle='font-medium' className='bg-slate-300' title='Nama Produk' htmlFor='name' type='text' value={formUpdate.name} onChange={handleChange} />
                <div className="flex gap-4 items-center">
                    <div className="dropdown ">
                        <h1 className='font-medium' >Kategori</h1>
                        <DropdownCustom defaultSelectedKey={formUpdate.category} clearButton={false} defaultItems={dataDropdown()} onSelect={(e: any) => onSelectionChange(e)}>
                            {(item: any) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                        </DropdownCustom>
                        <p className='text-red text-sm ' >{errorMsg.category}</p>
                    </div>
                    <InputForm errorMsg={errorMsg.quantity} marginDiown='mb-0' styleTitle='font-medium' className='bg-slate-300 h-9' title='Kuantitas' htmlFor='quantity' type='text' value={formUpdate.quantity} onChange={handleChange} />
                </div>

                <div className="flex gap-4 items-center">
                    <InputForm errorMsg={errorMsg.address} marginDiown='mb-0' styleTitle='font-medium' className='bg-slate-300' title='Lokasi' htmlFor='address' type='text' value={formUpdate.address} onChange={handleChange} />
                    <InputForm errorMsg={errorMsg.description} marginDiown='mb-0' styleTitle='font-medium' className='bg-slate-300' title='Deskripsi' htmlFor='description' type='text' value={formUpdate.description} onChange={handleChange} />
                </div>


                <InputForm errorMsg={errorMsg.price} marginDiown='mb-0' styleTitle='font-medium' className='bg-slate-300' title='Harga' htmlFor='price' type='text' value={formUpdate.price} onChange={handleChange} />
                <div className="flex justify-end gap-2">
                    <ButtonDelete className='rounded-md  py-2 px-2' onClick={onClose} >Batal</ButtonDelete>
                    <ButtonPrimary onClick={handleUpdate}
                        className='px-4 py-2 rounded-md flex justify-center items-center'
                    >{loading ? <Spinner className={`w-5 h-5 mx-8`} size="sm" color="white" /> : 'Simpan'}</ButtonPrimary>
                </div>

            </ModalDefault>

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