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
import { AutocompleteItem, Spinner, useDisclosure } from '@nextui-org/react'
import Image from 'next/image'

import React, { useEffect, useState } from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR, { mutate } from 'swr'


type Props = {}

const Page = (props: Props) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('Semua Kategori');
    const [searchData, setSearchData] = useState("");
    const [loading, setLoading] = useState(false)
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { data, error } = useSWR(`${url}/shop/list`, fetcher, {
        keepPreviousData: true,
    });
    const [errorMsg, setErrorMsg] = useState({
        name: '',
        description: '',
        address: '',
        price: '',
        image: '',
        category: '',
        quantity: '',
    })
    useEffect(() => {
        const storedId = localStorage.getItem('id');
        if (storedId) {
            setForm({ ...form, user: storedId })
        }
    }, []);
    const [form, setForm] = useState({
        name: '',
        description: '',
        address: '',
        price: '',
        image: [] as File[],
        category: '',
        quantity: '',
        user: '',
    })
    const dataShop = data?.data

    const openModalCreate = () => {
        onOpen()
    }
    console.log(form);


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
            setForm((prevForm) => ({ ...prevForm, [name]: numericValue ? Number(numericValue) : '' }));
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
            setForm((prevForm) => ({ ...prevForm, [name]: numericValue ? Number(numericValue) : '' }));
            return; // Menghentikan eksekusi lebih lanjut karena 'price' sudah di-handle
        }

        // Update state untuk input lainnya
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
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
                image: [...prevState.image, selectedImage],
            }));
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

        // Validasi form tidak boleh kosong
        const newErrorMsg = {
            name: form.name === '' ? '*Nama tidak boleh kosong' : '',
            description: form.description === '' ? '*Deskripsi tidak boleh kosong' : '',
            address: form.address === '' ? '*Alamat tidak boleh kosong' : '',
            price: form.price === '' ? '*Harga tidak boleh kosong' : '',
            image: form.image.length === 0 ? '*Gambar tidak boleh kosong' : '',
            category: form.category === '' ? '*Kategori tidak boleh kosong' : '',
            quantity: form.quantity === '' ? '*Jumlah tidak boleh kosong' : '',
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

        // Upload gambar jika form valid
        const imageUrl: string[] = await postImagesArray({ images: form.image });

        const data = {
            ...form,
            image: imageUrl,
        };

        if (imageUrl) {
            createProduct(data, (result: any) => {
                console.log(result);
                mutate(`${url}/shop/list`);
                onClose();
                setLoading(false);
            });
        }
    };


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
            <div className="bg-[#FFC107] min-h-10 rounded-xl grid md:grid-cols-2 p-5 gap-5 md:gap-0">
                <div className="flex flex-col justify-center items-center">
                    <div className="text">
                        <h1 className=' text-xl md:text-2xl  font-bold'>Gunakan Fitur  <span className='text-primary font-bold' >Toko Online</span>  untuk
                            memudahkan anda menjual sesuatu </h1>
                        <h2 className='text-white font-light' >Pesanan Online dibuat mudah,dan cepat </h2>
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
                <div className="w-full md:w-auto">
                    {/* filter search berada disini  */}
                    <Search onChange={handleSearch} className='border-2 border-black' placeholder="Cari Produk" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 my-7">
                {filteredData?.map((item: any, index: number) => (
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
                                        <p className='text-red text-center text-sm ' >{errorMsg.image}</p>
                                    </>
                                </SwiperSlide>
                            ))
                        ) : (
                            <div className='flex flex-col items-center'>
                                <Image className="w-auto h-[100px] relative " src={camera} alt="image"></Image>
                                <p className='text-red text-center text-sm ' >{errorMsg.image}</p>
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
                <InputForm errorMsg={errorMsg.name} marginDiown='mb-0' styleTitle='font-medium' className='bg-slate-300' title='Nama Produk' htmlFor='name' type='text' value={form.name} onChange={handleChange} />

                <div className="flex gap-4 items-center">
                    <div className="dropdown ">
                        <h1 className='font-medium' >Kategori</h1>
                        <DropdownCustom clearButton={false} defaultItems={dataDropdown()} onSelect={(e: any) => onSelectionChange(e)}>
                            {(item: any) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                        </DropdownCustom>
                        <p className='text-red text-sm ' >{errorMsg.category}</p>
                    </div>
                    <InputForm errorMsg={errorMsg.quantity} marginDiown='mb-0' styleTitle='font-medium' className='bg-slate-300 h-9' title='Kuantitas' htmlFor='quantity' type='text' value={form.quantity} onChange={handleChange} />
                </div>

                <div className="flex gap-4 items-center">
                    <InputForm errorMsg={errorMsg.address} marginDiown='mb-0' styleTitle='font-medium' className='bg-slate-300' title='Lokasi' htmlFor='address' type='text' value={form.address} onChange={handleChange} />
                    <InputForm errorMsg={errorMsg.description} marginDiown='mb-0' styleTitle='font-medium' className='bg-slate-300' title='Deskripsi' htmlFor='description' type='text' value={form.description} onChange={handleChange} />
                </div>


                <InputForm errorMsg={errorMsg.price} marginDiown='mb-0' styleTitle='font-medium' className='bg-slate-300' title='Harga' htmlFor='price' type='text' value={form.price} onChange={handleChange} />
                <div className="flex justify-end gap-2">
                    <ButtonDelete className='rounded-md  py-2 px-2' onClick={onClose} >Batal</ButtonDelete>
                    <ButtonPrimary onClick={handleCreate}
                        className='px-4 py-2 rounded-md flex justify-center items-center'
                    >{loading ? <Spinner className={`w-5 h-5 mx-8`} size="sm" color="white" /> : 'Simpan'}</ButtonPrimary>
                </div>
            </ModalDefault>
        </DefaultLayout>
    )
}

export default Page