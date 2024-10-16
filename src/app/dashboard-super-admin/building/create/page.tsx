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
const page = (props: Props) => {
    const dateNow = new Date();
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
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

        try {
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

            await createBuilding(data, (res: any) => {
                console.log(res);
                router.push('/dashboard-super-admin/building');
            });
        } catch (error) {
            setErrorMsg('Gagal mengirim data. Silakan coba lagi.');
        } finally {
            setLoading(false); // Pastikan loading false setelah selesai
        }
    };



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
                                        </>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <div className='flex justify-center'>
                                    <Image className="w-auto h-[200px] relative " src={camera} alt="image"></Image>
                                </div>
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

                <InputForm className='bg-slate-300 w-full' type='text' title='Nama Pembangunan'
                    value={form.title} htmlFor='title' onChange={handleChange} />

                <InputForm
                    className='bg-slate-300'
                    type='text'
                    value={form.source_of_funds}
                    htmlFor='source_of_funds'
                    onChange={handleChange}
                    title='Sumber Dana'
                />
                <div className="flex gap-4">
                    <InputForm
                        className='bg-slate-300'
                        type='text'
                        placeholder='Volume'
                        value={form.volume}
                        htmlFor='volume'
                        title='Volume'
                        onChange={handleChange}
                    />

                    <InputForm
                        className='bg-slate-300'
                        type='text'
                        placeholder='Anggaran'
                        value={form.budget}
                        htmlFor='budget'
                        title='Anggaran'
                        onChange={handleChange}
                    />
                </div>

                <InputForm
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
                </div>

                <div className="location mt-5">
                    <MapChoise markerPosition={{ lat: form.location.latitude, lng: form.location.longitude }} zoom={13} text="Lokasi kejadian" className="h-[300px]  rounded-md mt-4" >
                        <MapEvents />
                    </MapChoise>
                </div>
                <p className='text-red text-sm mt-2' >{errorMsg} </p>
                <div className="flex mt-2 justify-end">
                    <ButtonPrimary onClick={handleCreate} disabled={loading} className='px-4 py-2 rounded-md flex justify-center items-center'
                    >{loading ? <Spinner className={`w-5 h-5 mx-8`} size="sm" color="white" /> : 'Kirim'}</ButtonPrimary>
                </div>

            </div>
        </DefaultLayout>
    )
}

export default page