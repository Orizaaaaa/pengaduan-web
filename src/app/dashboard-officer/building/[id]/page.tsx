'use client'


import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import dynamic from 'next/dynamic'
import { bgPengaduan, camera, pembangunan } from '@/app/image'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import useSWR, { mutate } from 'swr'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { formatDate, formatRupiah, parseCoordinate } from '@/utils/helper'
import { FaPen, FaTrashAlt } from 'react-icons/fa'
import InputForm from '@/components/elements/input/InputForm'
import { useMapEvents } from 'react-leaflet'
import CaraoselImage from '@/components/fragemnts/caraoselProduct/caraoselProduct'
import { IoCloseCircleOutline } from 'react-icons/io5'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import { parseDate } from '@internationalized/date'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import { AutocompleteItem, DatePicker, image, Spinner, useDisclosure } from '@nextui-org/react'
import DropdownCustom from '@/components/elements/dropdown/Dropdown'
import { postImagesArray } from '@/api/imagePost'
import { deleteBuilding, updateBuilding } from '@/api/building'
import ModalAlert from '@/components/fragemnts/modal/modalAlert'
import ButtonDelete from '@/components/elements/buttonDelete'
const MapChoise = dynamic(() => import('@/components/fragemnts/maps/MapChoise'), {
    ssr: false
});
const Map = dynamic(() => import('@/components/fragemnts/maps/Map'), {
    ssr: false
});


type Props = {}

const page = (props: Props) => {
    const dateNow = new Date();
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [updatePage, setUpdatePage] = useState(true)
    const idBuilding = useParams().id
    const { data, error } = useSWR(`${url}/infrastucture/${idBuilding}`, fetcher, {
        keepPreviousData: true,
    });
    const dataBuilding = data?.data

    const dataDetail = [
        {
            title: 'Anggaran',
            value: formatRupiah(dataBuilding?.budget)
        },
        {
            title: 'Sumber Dana',
            value: dataBuilding?.source_of_funds
        },
        {
            title: 'Volume',
            value: `${dataBuilding?.volume} m³`
        },
        {
            title: 'Status',
            value: dataBuilding?.status
        },
        {
            title: 'Tahun',
            value: formatDate(dataBuilding?.date)
        },
        {
            title: 'Alamat',
            value: dataBuilding?.address
        },
    ]
    const [form, setForm] = useState({
        title: '',
        description: '',
        address: '',
        location: {
            latitude: 0,
            longitude: 0,
        },
        status: '',
        image: [] as File[],
        budget: 0,
        volume: 0,
        source_of_funds: '',
        date: parseDate(formatDate(dateNow))
    });

    useEffect(() => {
        if (dataBuilding) {
            setForm({
                title: dataBuilding.title || '',
                description: dataBuilding.description || '',
                address: dataBuilding.address || '',
                location: {
                    latitude: dataBuilding.location?.latitude || 0,
                    longitude: dataBuilding.location?.longitude || 0,
                },
                status: dataBuilding.status || '',
                image: dataBuilding.image,
                budget: dataBuilding.budget || 0,
                volume: dataBuilding.volume || 0,
                source_of_funds: dataBuilding.source_of_funds || '',
                date: parseDate(formatDate(dataBuilding.date)) || ''
            });
        }
    }, [dataBuilding]);


    // action handle
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


    const handleChange = (e: any) => {
        const { name, value } = e.target;

        // Cek apakah field adalah 'budget' atau 'volume' untuk memvalidasi sebagai angka
        if (name === 'budget' || name === 'volume') {
            // Jika value kosong (misalnya setelah Ctrl+A dan delete), set nilai menjadi 0
            if (value === "") {
                setForm({ ...form, [name]: 0 });
            } else {
                // Hanya set value jika input berupa angka
                const numericValue = parseFloat(value);
                if (!isNaN(numericValue)) {
                    setForm({ ...form, [name]: numericValue });
                }
            }
        } else {
            setForm({ ...form, [name]: value });
        }
    };


    // Komponen untuk menangani event klik pada peta
    const MapEvents = () => {
        useMapEvents({
            click(e: any) {
                // Memperbarui posisi latitude dan longitude di dalam objek location
                setForm((prevForm) => ({
                    ...prevForm,
                    location: {
                        ...prevForm.location,
                        latitude: e.latlng.lat,
                        longitude: e.latlng.lng,
                    }
                }));
            }
        });
        return null;
    };


    console.log(form);

    const dataStatus = [
        { label: "Sedang Berjalan", value: "Sedang Berjalan" },
        { label: "Berhenti Sementara", value: "Berhenti Sementara" },
        { label: "Selesai", value: "Selesai" },
    ]

    const onSelectionChange = (key: string) => {
        setForm({
            ...form,         // Salin semua properti dari objek `form`
            status: key      // Ganti nilai `status` dengan `key`
        });
    };




    const handleUpdate = async () => {
        setLoading(true);

        // Validasi untuk memastikan tidak ada field yang kosong
        if (!form.title || !form.description || !form.address || !form.status || !form.source_of_funds || form.budget <= 0 || form.volume <= 0 || form.image.length === 0) {
            setErrorMsg('Semua field harus diisi dengan benar.');
            setLoading(false);
            return;
        }

        if (form.location.latitude === 0 || form.location.longitude === 0) {
            setErrorMsg('Lokasi harus dipilih.');
            setLoading(false);
            return;
        }

        setErrorMsg(''); // Hapus pesan error jika semua validasi lolos

        const existingUrls = form.image.filter((item: any): item is string => typeof item === 'string'); // Gambar lama (URL)
        const newFiles = form.image.filter((item: any): item is File => item instanceof File); // Gambar baru (File)

        // Upload gambar baru ke Cloudinary jika ada
        let uploadedUrls: string[] = [];
        if (newFiles.length > 0) {
            uploadedUrls = await postImagesArray({ images: newFiles });
        }

        // Gabungkan URL lama dengan URL baru yang di-upload
        const allUrls = [...existingUrls, ...uploadedUrls];

        // Data untuk dikirim ke update API
        const data = {
            ...form,
            image: allUrls,
            date: formatDate(form.date),
            location: {
                latitude: String(form.location.latitude),
                longitude: String(form.location.longitude)
            }
        };

        try {
            await updateBuilding(idBuilding, data, (result: any) => {
                console.log(result);
                mutate(`${url}/infrastucture/${idBuilding}`);
                setForm({
                    title: dataBuilding.title || '',
                    description: dataBuilding.description || '',
                    address: dataBuilding.address || '',
                    location: {
                        latitude: dataBuilding.location?.latitude || 0,
                        longitude: dataBuilding.location?.longitude || 0,
                    },
                    status: dataBuilding.status || '',
                    image: dataBuilding.image,
                    budget: dataBuilding.budget || 0,
                    volume: dataBuilding.volume || 0,
                    source_of_funds: dataBuilding.source_of_funds || '',
                    date: parseDate(formatDate(dataBuilding.date)) || ''
                });
                setUpdatePage(true);
            });
        } catch (error) {
            setErrorMsg('Gagal mengirim data. Silakan coba lagi.');
        } finally {
            setLoading(false); // Pastikan loading false setelah selesai
        }
    };


    const { isOpen: isWarningOpen, onOpen: onWarningOpen, onClose: onWarningClose } = useDisclosure();
    const openModalDelete = () => {
        onWarningOpen()
    }

    const router = useRouter()
    const handleDelete = () => {
        setLoadingDelete(true)
        deleteBuilding(idBuilding, (result: any) => {
            console.log(result);
            onWarningClose()
            router.push('/dashboard-officer/building    ')
            setLoadingDelete(false)
        })
    }



    return (
        <DefaultLayout>
            <div className=" button-action flex justify-end mb-2 gap-3 ">
                <div className="flex bg-white justify-end gap-3 p-2 rounded-lg ">
                    <FaTrashAlt onClick={openModalDelete} className='cursor-pointer' color='red' />
                    <FaPen onClick={() => setUpdatePage(prev => !prev)} className='cursor-pointer' color='blue' />
                </div>

            </div>
            {updatePage ?
                <section className=' bg-white p-4 mx-auto py-10 px-5  rounded-md '>
                    <h1 className='text-2xl font-bold text-center'> {dataBuilding?.title}</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
                        <div className="rounded-md hover: border-stroke bg-white  shadow-default  dark:border-strokedark">
                            <Swiper
                                slidesPerView={1} // Jumlah default slide yang ditampilkan
                                spaceBetween={30}
                                pagination={{
                                    clickable: true, // Pagination akan bisa diklik
                                }}
                                modules={[Pagination]}
                                className="mySwiper"
                            >

                                {dataBuilding?.image.map((item: any, index: number) => (
                                    <SwiperSlide key={index} >
                                        <div className="images h-[300px]  ">
                                            <img className='rounded-lg w-full h-full' src={item} alt={item} />
                                        </div>

                                    </SwiperSlide>
                                ))}



                            </Swiper>
                        </div>

                        <div className="text">
                            <h1 className='text-lg font-medium'>Deskripsi</h1>
                            <p className='text-sm' > {dataBuilding?.description}</p>
                        </div>

                    </div>

                    <section className="detail">
                        <div className="text space-y-2">
                            <h1 className='font-medium'>Detail Pembangunan</h1>
                            <hr className='w-full text-[#eeeeee]' />
                        </div>

                        <div className="grid md:grid-cols-2 gap-5 mt-10">
                            {dataDetail.map((item, index) => (
                                <div className="flex  gap-5" key={index}>

                                    <div className="text">
                                        <h1 className='font-medium' >{item?.title}</h1>
                                        <h1>{item?.value}</h1>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </section>



                    <div className="text space-y-2 mt-20">
                        <h1 className='font-medium'>Lokasi Pembangunan</h1>
                        <hr className='w-full text-[#eeeeee]' />
                    </div>
                    <div className="location mt-5">
                        {dataBuilding?.location?.latitude && dataBuilding?.location?.longitude ? (
                            <Map
                                lat={parseCoordinate(dataBuilding?.location?.latitude)}
                                lng={parseCoordinate(dataBuilding?.location?.longitude)}
                            />
                        ) : (
                            <p>Loading map...</p> // Bisa juga berupa loader
                        )}
                    </div>

                </section> :

                <section className=' bg-white p-4 mx-auto py-10 px-5  rounded-md '>
                    <div className="flex justify-center items-center w-full">
                        <InputForm className='bg-slate-300 w-full' type='text' placeholder='Nama Pembangunan' value={form.title} htmlFor='title' onChange={handleChange} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
                        {/* image changer */}
                        <div className="rounded-md hover: border-stroke bg-white  p-4 shadow-default  dark:border-strokedark">
                            <div>
                                <CaraoselImage>
                                    {form.image.length > 0 ? (
                                        form.image.map((image: any, index: number) => (
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
                                                        className="button-delete array-image absolute top-0 right-0 z-10"
                                                    >
                                                        <IoCloseCircleOutline onClick={() => deleteArrayImage(index, 'add')} color="red" size={34} />
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
                                    <ButtonPrimary className='rounded-md relative cursor-pointer py-2 px-1' >Tambah Image
                                        <input
                                            type="file"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            id="image-input-add"
                                            onChange={(e) => handleImageChange(e, 'add')}
                                        />
                                    </ButtonPrimary>
                                    <ButtonSecondary className='rounded-md  py-2 px-1' onClick={() => setForm(prevForm => ({ ...prevForm, image: [] }))} >Hapus Semua</ButtonSecondary>
                                </div>
                            </div>
                        </div>

                        <div className="text">
                            <h1 className='text-lg font-medium'>Deskripsi</h1>
                            <textarea onChange={handleChange} name="description" id="description" cols={30} value={form.description} rows={4}
                                className="block p-2.5 w-full bg-slate-300 rounded-md outline-none mt-2" ></textarea>
                        </div>

                    </div>

                    <section className="detail">
                        <div className="text space-y-2">
                            <h1 className='font-medium'>Detail Pembangunan</h1>
                            <hr className='w-full text-[#eeeeee]' />
                        </div>

                        <div className="grid md:grid-cols-2 gap-5 mt-10">

                            <div className="grid grid-cols-2 gap-5 mt-10">
                                <div className="flex  gap-5">
                                    <div className="text">
                                        <h1 className='font-medium' >Anggaran</h1>
                                        <InputForm
                                            className='bg-slate-300'
                                            type='text'
                                            placeholder='Anggaran'
                                            value={form.budget}
                                            htmlFor='budget'
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex  gap-5">
                                    <div className="text">
                                        <h1 className='font-medium' >Sumber Dana</h1>
                                        <InputForm
                                            className='bg-slate-300'
                                            type='text'
                                            placeholder='Sumber Dana'
                                            value={form.source_of_funds}
                                            htmlFor='source_of_funds'
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex  gap-5">
                                    <div className="text">
                                        <h1 className='font-medium' >Volume</h1>
                                        <InputForm
                                            className='bg-slate-300'
                                            type='text'
                                            placeholder='Volume'
                                            value={form.volume}
                                            htmlFor='volume'
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex  gap-5">
                                    <div className="text">
                                        <h1 className='font-medium' >Status</h1>
                                        <DropdownCustom defaultSelectedKey={dataBuilding?.status} clearButton={false} defaultItems={dataStatus} onSelect={(e: any) => onSelectionChange(e)}>
                                            {(item: any) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                        </DropdownCustom>
                                    </div>
                                </div>

                                <div className="flex  gap-5">
                                    <div className="text">
                                        <h1 className='font-medium' >Tahun</h1>
                                        <DatePicker aria-label='date' value={form.date} variant={'underlined'} onChange={(e) => setForm({ ...form, date: e })} />
                                    </div>
                                </div>

                                <div className="flex  gap-5">
                                    <div className="text">
                                        <h1 className='font-medium' >Alamat</h1>
                                        <InputForm
                                            className='bg-slate-300'
                                            type='text'
                                            placeholder='Alamat'
                                            value={form.address}
                                            htmlFor='address'
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>


                            </div>
                        </div>

                    </section>



                    <div className="text space-y-2 mt-20">
                        <h1 className='font-medium'>Lokasi Pembangunan</h1>
                        <hr className='w-full text-[#eeeeee]' />
                    </div>
                    <div className="location mt-5">
                        <MapChoise markerPosition={{ lat: form.location.latitude, lng: form.location.longitude }} zoom={13} text="Lokasi kejadian" className="h-[300px]  rounded-md mt-4" >
                            <MapEvents />
                        </MapChoise>
                    </div>

                    <p className='text-red text-sm mt-2' >{errorMsg} </p>
                    <div className="flex mt-2 justify-end">
                        <ButtonPrimary onClick={handleUpdate} disabled={loading} className='px-4 py-2 rounded-md flex justify-center items-center'
                        >{loading ? <Spinner className={`w-5 h-5 mx-8`} size="sm" color="white" /> : 'Kirim'}</ButtonPrimary>
                    </div>
                </section>}

            <ModalAlert isOpen={isWarningOpen} onClose={onWarningClose}>
                <h1>Apakah anda yakin ingin menghapus data pembangunan ini yang berjudul <br /> <span className='font-medium' > " {dataBuilding?.title} "</span> </h1>

                <div className="flex gap-3 justify-end">
                    <ButtonPrimary onClick={onWarningClose} className='px-4 py-2 rounded-md'>Batal</ButtonPrimary>
                    <ButtonDelete onClick={handleDelete} className='px-4 py-2 rounded-md
                     flex justify-center items-center'
                    >{loadingDelete ? <Spinner className={`w-5 h-5 mx-8`} size="sm" color="white" /> : 'Ya, Hapus'}</ButtonDelete>
                </div>
            </ModalAlert>

        </DefaultLayout>

    )
}

export default page