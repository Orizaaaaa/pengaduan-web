'use client'
import { createBuilding } from '@/api/building'
import { postImagesArray } from '@/api/imagePost'
import { camera } from '@/app/image'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import DropdownCustom from '@/components/elements/dropdown/Dropdown'
import InputForm from '@/components/elements/input/InputForm'
import CaraoselImage from '@/components/fragemnts/caraoselProduct/caraoselProduct'
import dynamic from 'next/dynamic'
const MapChoise = dynamic(() => import('@/components/fragemnts/maps/MapChoise'), {
    ssr: false
});
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { formatDate } from '@/utils/helper'
import { parseDate } from '@internationalized/date'
import { AutocompleteItem, DatePicker, image, Spinner } from '@nextui-org/react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { SwiperSlide } from 'swiper/react'
import { useMapEvents } from 'react-leaflet'

type Props = {}
const Page = (props: Props) => {
    const dateNow = new Date();
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState({
        title: '',
        description: '',
        address: '',
        location: '',
        status: '',
        image: '',
        budget: '',
        volume: '',
        source_of_funds: '',
    })
    const [form, setForm] = useState({
        title: '',
        description: '',
        address: '',
        location: {
            latitude: -6.922677843794353,
            longitude: 107.61159896850587,
        },
        status: '',
        image: [] as File[],
        budget: 0,
        volume: 0,
        source_of_funds: '',
        date: parseDate(formatDate(dateNow))
    });

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

    const router = useRouter()
    const handleCreate = async () => {
        setLoading(true);

        // Validasi untuk memastikan semua field tidak kosong
        let isValid = true;
        const newErrorMsg = {
            title: '',
            description: '',
            address: '',
            location: '',
            status: '',
            image: '',
            budget: '',
            volume: '',
            source_of_funds: '',
        };

        if (!form.title) {
            newErrorMsg.title = 'Judul harus diisi';
            isValid = false;
        }
        if (!form.description) {
            newErrorMsg.description = 'Deskripsi harus diisi';
            isValid = false;
        }
        if (!form.address) {
            newErrorMsg.address = 'Alamat harus diisi';
            isValid = false;
        }
        if (!form.status) {
            newErrorMsg.status = 'Status harus diisi';
            isValid = false;
        }
        if (!form.source_of_funds) {
            newErrorMsg.source_of_funds = 'Sumber dana harus diisi';
            isValid = false;
        }
        if (form.budget <= 0) {
            newErrorMsg.budget = 'Anggaran harus lebih besar dari 0';
            isValid = false;
        }
        if (form.volume <= 0) {
            newErrorMsg.volume = 'Volume harus lebih besar dari 0';
            isValid = false;
        }
        if (form.image.length === 0) {
            newErrorMsg.image = 'Gambar harus diunggah';
            isValid = false;
        }
        if (form.location.latitude === 0 || form.location.longitude === 0) {
            newErrorMsg.location = 'Lokasi harus dipilih';
            isValid = false;
        }

        // Jika ada error, set pesan error dan hentikan proses
        if (!isValid) {
            setErrorMsg(newErrorMsg);
            setLoading(false);
            return;
        }

        // Reset errorMsg jika semua validasi lolos
        setErrorMsg({
            title: '',
            description: '',
            address: '',
            location: '',
            status: '',
            image: '',
            budget: '',
            volume: '',
            source_of_funds: '',
        });

        try {
            // Upload gambar dan proses data
            const urls: string[] = await postImagesArray({ images: form.image });
            const data = {
                ...form,
                image: urls,
                date: formatDate(form.date),
                location: {
                    latitude: String(form.location.latitude),
                    longitude: String(form.location.longitude),
                },
            };

            // Kirim data ke backend
            await createBuilding(data, (res: any) => {
                console.log(res);
                router.push('/dashboard-officer/building');
            });
        } catch (error) {
            setErrorMsg((prev) => ({
                ...prev,
                general: 'Gagal mengirim data. Silakan coba lagi.',
            }));
        } finally {
            setLoading(false); // Pastikan loading false setelah selesai
        }
    };


    console.log(form);



    return (
        <DefaultLayout>
            <div className="bg-white p-3">
                <div className="rounded-md px-8 my-4  bg-white  md:p-4  ">
                    <div  >
                        <CaraoselImage>
                            {form.image.length > 0 ? (
                                form.image.map((image, index) => (
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
                                            <p className='text-red text-sm mt-2' >{errorMsg.image} </p>
                                        </>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <>
                                    <div className='flex justify-center'>
                                        <Image className="w-auto h-[200px] relative " src={camera} alt="image"></Image>
                                    </div>
                                    <p className='text-red text-sm mt-2' >{errorMsg.image} </p>
                                </>

                            )}
                        </CaraoselImage>

                        <div className="grid grid-cols-2 justify-between my-2 gap-2">
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
                </div>

                <InputForm errorMsg={errorMsg.title} className='bg-slate-300 w-full' type='text' title='Nama Pembangunan'
                    value={form.title} htmlFor='title' onChange={handleChange} />

                <InputForm errorMsg={errorMsg.source_of_funds}
                    className='bg-slate-300'
                    type='text'
                    value={form.source_of_funds}
                    htmlFor='source_of_funds'
                    onChange={handleChange}
                    title='Sumber Dana'
                />
                <div className="flex gap-4">
                    <InputForm errorMsg={errorMsg.volume}
                        className='bg-slate-300'
                        type='text'
                        placeholder='Volume'
                        value={form.volume}
                        htmlFor='volume'
                        title='Volume'
                        onChange={handleChange}
                    />

                    <InputForm errorMsg={errorMsg.budget}
                        className='bg-slate-300'
                        type='text'
                        placeholder='Anggaran'
                        value={form.budget}
                        htmlFor='budget'
                        title='Anggaran'
                        onChange={handleChange}
                    />
                </div>

                <InputForm errorMsg={errorMsg.address}
                    className='bg-slate-300'
                    type='text'
                    title='Alamat'
                    value={form.address}
                    htmlFor='address'
                    onChange={handleChange}
                />

                <div className="flex gap-5">
                    <div className="dropdown">
                        <h1>Status</h1>
                        <DropdownCustom defaultSelectedKey={''} clearButton={false} defaultItems={dataStatus} onSelect={(e: any) => onSelectionChange(e)}>
                            {(item: any) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                        </DropdownCustom>
                        <p className='text-red text-sm mt-2' >{errorMsg.status} </p>
                    </div>
                    <div className="date w-full">
                        <h1>Tanggal</h1>
                        <DatePicker showMonthAndYearPickers aria-label='date' value={form.date} variant={'bordered'} onChange={(e) => setForm({ ...form, date: e })} />

                    </div>

                </div>




                <div className="deskripsi mt-2">
                    <h1>Deskripsi</h1>
                    <textarea onChange={handleChange} name="description" id="description" cols={30} value={form.description} rows={4}
                        className="block p-2.5 w-full bg-slate-300 rounded-md outline-none mt-2" ></textarea>
                    <p className='text-red text-sm mt-2' >{errorMsg.description} </p>
                </div>

                <div className="location mt-5">
                    <MapChoise markerPosition={{ lat: form.location.latitude, lng: form.location.longitude }} zoom={13} text={form.address || 'Lokasi Pembangunan'} className="h-[300px]  rounded-md mt-4" >
                        <MapEvents />
                    </MapChoise>
                </div>
                <div className="flex mt-2 justify-end">
                    <ButtonPrimary onClick={handleCreate} disabled={loading} className='px-4 py-2 rounded-md flex justify-center items-center'
                    >{loading ? <Spinner className={`w-5 h-5 mx-8`} size="sm" color="white" /> : 'Kirim'}</ButtonPrimary>
                </div>

            </div>
        </DefaultLayout>
    )
}

export default Page