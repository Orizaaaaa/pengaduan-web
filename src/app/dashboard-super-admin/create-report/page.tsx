'use client'
import { getCategories } from '@/api/category'
import { postImage } from '@/api/imagePost'
import { createReport } from '@/api/report'
import { camera } from '@/app/image'
import Card from '@/components/elements/card/Card'
import InputForm from '@/components/elements/input/InputForm'
import InputReport from '@/components/elements/input/InputReport'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { title } from 'process'
import React, { useEffect, useState } from 'react'
import { useMapEvents } from 'react-leaflet'
const MapChoise = dynamic(() => import('@/components/fragemnts/maps/MapChoise'), {
    ssr: false
});

type Props = {}

const CreateReport = (props: Props) => {
    const [errorMsg, setErrorMsg] = useState({
        title: '',
        image: '',
        lat: '',
        long: '',
        location: '',
        desc: '',
        categori: ''
    });

    const [category, setCategory] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        image: null as File | null,
        lat: -6.840540,
        long: 107.430687,
        location: '',
        desc: '',
        categori: ''
    });

    useEffect(() => {
        getCategories((result: any) => {
            setCategory(result.data);
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const MapEvents = () => {
        useMapEvents({
            click(e: any) {
                setFormData({ ...formData, lat: e.latlng.lat, long: e.latlng.lng });
            }
        });
        return null;
    };

    const handleCategory = (value: string) => {
        setFormData({ ...formData, categori: value });
    }

    const handleFileManager = (fileName: string) => {
        if (fileName === 'add') {
            const fileInput = document.getElementById("image-input-add") as HTMLInputElement | null;
            fileInput ? fileInput.click() : null;
        } else {
            console.log('error');
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, InputSelect: string) => {
        if (InputSelect === 'add') {
            const selectedImage = e.target.files?.[0];

            if (selectedImage) {
                // Validasi tipe file
                const allowedTypes = ['image/png', 'image/jpeg'];
                if (!allowedTypes.includes(selectedImage.type)) {
                    setErrorMsg((prev) => ({
                        ...prev,
                        image: '*Hanya file PNG dan JPG yang diperbolehkan',
                    }));
                    return; // Tidak update state jika tipe file tidak valid
                }

                // Validasi ukuran file (dalam byte, 5MB = 5 * 1024 * 1024)
                const maxSize = 5 * 1024 * 1024;
                if (selectedImage.size > maxSize) {
                    setErrorMsg((prev) => ({
                        ...prev,
                        image: '*Ukuran file maksimal 5 MB',
                    }));
                    return; // Tidak update state jika ukuran file lebih dari 5MB
                }

                // Hapus pesan error jika file valid
                setErrorMsg((prev) => ({
                    ...prev,
                    image: '',
                }));

                // Update state dengan file yang valid
                setFormData({ ...formData, image: selectedImage });
            } else {
                console.log('error');
            }
        }
    };

    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset error messages
        setErrorMsg({
            title: '',
            image: '',
            lat: '',
            long: '',
            location: '',
            desc: '',
            categori: ''
        });

        // Validasi sebelum mengirim laporan
        let valid = true;

        if (!formData.title) {
            setErrorMsg((prev) => ({ ...prev, title: '*Judul laporan harus diisi' }));
            valid = false;
        }

        if (!formData.image) {
            setErrorMsg((prev) => ({ ...prev, image: '*Gambar harus diisi' }));
            valid = false;
        }

        if (!formData.location) {
            setErrorMsg((prev) => ({ ...prev, location: '*Lokasi kejadian harus diisi' }));
            valid = false;
        }

        if (!formData.categori) {
            setErrorMsg((prev) => ({ ...prev, categori: '*Kategori harus dipilih' }));
            valid = false;
        }

        if (valid) {
            const imageUrl = await postImage({ image: formData.image });
            if (imageUrl) {
                const formUnitWork: any = {
                    title: formData.title,
                    imageReport: [imageUrl],
                    longitude: String(formData.long),
                    latitude: String(formData.lat),
                    address: formData.location,
                    description: formData.desc,
                    category: formData.categori
                };

                createReport(formUnitWork, (status: boolean, res: any) => {
                    if (status) {
                        router.push('/dashboard-super-admin/report');
                        console.log(res);
                    }
                });
            } else {
                console.log('Error uploading image.');
            }
        }
    };
    return (
        <DefaultLayout>
            <Card>
                <h1 className="text-lg font-semibold text-primary py-4 border-b-2 border-primary" >Buat Laporan</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 mt-4 gap-4">
                    <div className="input-report ">
                        <InputForm errorMsg={errorMsg.title} className='bg-slate-300' htmlFor="title" title="Judul Laporan  " type="text" onChange={handleChange} value={formData.title} />
                        <InputForm errorMsg={errorMsg.location} className='bg-slate-300' htmlFor="location" title="Lokasi kejadian  " type="text" onChange={handleChange} value={formData.location} />
                        <label className="font-medium" htmlFor="desc" >Deskripsi Laporan  </label>
                        <textarea onChange={handleChange} name="desc" id="desc" cols={30} value={formData.desc} rows={4} className="block p-2.5 w-full bg-slate-300 rounded-md outline-none mt-2" ></textarea>
                    </div>

                    {/* images input */}
                    <div className="images ">
                        {formData.image && formData.image instanceof Blob ? (
                            <img className="h-[170px] md:h-[300px] w-auto mx-auto rounded-md" src={URL.createObjectURL(formData.image)} />
                        ) : (
                            <div className="images border-dashed border-2 border-black rounded-md h-[200px] bg-gray-300">
                                <button className="flex-col justify-center items-center h-full w-full " type="button" onClick={() => handleFileManager('add')} >
                                    <Image alt='image' className="w-20 h-20 mx-auto" src={camera} />
                                    <p>*Masukan gambar sebagai bukti kuat pengajuan laporan</p>
                                </button>
                            </div>
                        )}

                        <input
                            type="file"
                            className="hidden"
                            id="image-input-add"
                            onChange={(e) => handleImageChange(e, 'add')}
                        />

                        <div className="flex justify-center gap-3 mt-3">
                            <button className={`border-2 border-primary  text-primary px-4 py-2 rounded-md ${formData.image === null ? 'hidden' : ''}`} type="button" onClick={() => handleFileManager('add')} >Ubah Gambar</button>
                        </div>

                        {errorMsg.image && <p className="text-red text-sm">{errorMsg.image}</p>}
                    </div>
                </div>

                {/* maps */}
                <MapChoise markerPosition={{ lat: formData.lat, lng: formData.long }} zoom={13} text={formData.location} className="h-[300px]  rounded-md mt-4" >
                    <MapEvents />
                </MapChoise>
                <h1 className="my-3 text-medium font-medium" >Pilih salah satu kategori</h1>
                <div className='grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 container mx-auto gap-5 mt-5'>

                    {category.map((item: any, index) => (
                        <div className="image flex-col justify-center items-center" key={index}>
                            <img onClick={() => handleCategory(item._id)} src={item.image} className={`w-[70px] h-[70px] mx-auto rounded-full
                             object-cover cursor-pointer ${formData.categori === item._id ? 'border-3 border-primary' : ''} `} alt='image' />

                            <p className={`text-sm md:text-base mt-1 text-center`}>{item.name}</p>
                        </div>
                    ))}
                </div>
                <p className='text-red text-sm'>{errorMsg.categori}</p>

                <button className="bg-primary text-white px-4 py-2 rounded-md w-full mt-4" onClick={handleSubmit}>Kirim Laporan</button>
            </Card>
        </DefaultLayout>
    )
}

export default CreateReport