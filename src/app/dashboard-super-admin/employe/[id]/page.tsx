'use client'

import { deleteEmploye, getEmployeById, updateEmploye } from '@/api/employe'
import { postImage } from '@/api/imagePost'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import InputForm from '@/components/elements/input/InputForm'
import ModalDefault from '@/components/fragemnts/modal/modal'
import ModalAlert from '@/components/fragemnts/modal/modalAlert'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { formatDate, formatDateStr } from '@/utils/helper'
import { parseDate } from '@internationalized/date'
import { DatePicker, Modal, ModalBody, ModalContent, Spinner, useDisclosure } from '@nextui-org/react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { FaPen } from 'react-icons/fa6'

type Props = {}

interface Employee {
    _id: string;
    name: string;
    position: string;
    division: string;
    address: string;
    email: string;
    phoneNumber: string;
    image: string;
    birthDate: string; // atau bisa menggunakan Date jika ingin mengelolanya sebagai objek Date
    joinDate: string; // sama seperti birthDate
    createdAt: string;
    updatedAt: string;
    __v: number;
}


const Page = (props: Props) => {
    const router = useRouter()
    const dateNow = new Date();
    const { isOpen: isWarningOpen, onOpen: onWarningOpen, onClose: onWarningClose } = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false)
    const { id }: any = useParams()
    const [data, setData] = useState({} as Employee)

    const [errorMsg, setErrorMsg] = useState(
        {
            name: '',
            position: '',
            division: '',
            address: '',
            email: '',
            phoneNumber: '',
            image: '',
        }
    )

    const [form, setForm] = useState({
        name: '',
        position: '',
        division: '',
        address: '',
        email: '',
        phoneNumber: '',
        image: null as File | null,
        birthDate: parseDate(formatDate(dateNow)),
        joinDate: parseDate(formatDate(dateNow)),
    })

    useEffect(() => {
        getEmployeById(id, (result: any) => {
            setData(result.data)
            setForm(prevForm => ({
                ...prevForm,
                name: result.data.name,
                position: result.data.position,
                division: result.data.division,
                address: result.data.address,
                email: result.data.email,
                phoneNumber: result.data.phoneNumber,
                birthDate: parseDate(formatDate(result.data.birthDate)),
                joinDate: parseDate(formatDate(result.data.joinDate)),
                image: result.data.image
            }));
        });
    }, [id]);



    // action update 
    const openModalUpdate = () => {
        onOpen()
    }

    //input gambar
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
                setForm({ ...form, image: selectedImage });
            } else {
                console.log('error');
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Update state terlebih dahulu
        setForm((prevForm) => ({ ...prevForm, [name]: value }));

        // Validasi khusus email
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex untuk format email

            if (!emailRegex.test(value)) {
                setErrorMsg((prev) => ({
                    ...prev,
                    email: '*Format email tidak valid',
                }));
            } else {
                setErrorMsg((prev) => ({
                    ...prev,
                    email: '',
                }));
            }
            return; // Hentikan setelah memproses email
        }

        // Validasi khusus nomor telepon
        if (name === 'phoneNumber') {
            let numericValue = value.replace(/\D/g, '');

            if (numericValue.startsWith('08')) {
                numericValue = '628' + numericValue.slice(2);
            }

            if (numericValue.length > 15) {
                setErrorMsg((prev) => ({
                    ...prev,
                    phoneNumber: '*Nomor tidak boleh lebih dari 15 angka',
                }));
                return;
            } else {
                setErrorMsg((prev) => ({
                    ...prev,
                    phoneNumber: '',
                }));
            }

            setForm({ ...form, [name]: numericValue });
            return;
        }

        // Validasi agar `name` hanya mengandung huruf
        if (name === 'name') {
            const filteredValue = value.replace(/[^a-zA-Z\s]/g, ''); // Hanya huruf dan spasi yang diizinkan
            const hasNumber = /\d/.test(value);

            if (hasNumber) {
                setErrorMsg((prev) => ({
                    ...prev,
                    name: '*Nama tidak boleh mengandung angka',
                }));
            } else {
                setErrorMsg((prev) => ({
                    ...prev,
                    name: '',
                }));
            }

            setForm((prevForm) => ({ ...prevForm, [name]: filteredValue })); // Update state dengan nilai yang difilter
            return;
        }
    };



    // action update
    const handleUpdate = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        const newErrorMsg: any = {
            name: form.name ? '' : '*Nama tidak boleh kosong',
            position: form.position ? '' : '*Posisi tidak boleh kosong',
            division: form.division ? '' : '*Divisi tidak boleh kosong',
            address: form.address ? '' : '*Alamat tidak boleh kosong',
            email: form.email ? '' : '*Email tidak boleh kosong',
            phoneNumber: form.phoneNumber ? '' : '*Nomor telepon tidak boleh kosong',
            image: form.image ? '' : '*Gambar tidak boleh kosong',
        };

        setErrorMsg(newErrorMsg);
        // Jika ada error, hentikan proses
        const hasError = Object.values(newErrorMsg).some((msg) => msg !== '');
        if (hasError) {
            setLoading(false);
            return;
        }

        if (form.image instanceof Blob) {
            const imageUrl = await postImage({ image: form.image });

            if (imageUrl) {
                const data: any = { ...form, image: imageUrl, birthDate: formatDateStr(form.birthDate), joinDate: formatDateStr(form.joinDate) };
                updateEmploye(id, data, (result: any) => {
                    getEmployeById(id, (result: any) => {
                        setData(result.data)
                        setForm(prevForm => ({
                            ...prevForm,
                            name: result.data.name,
                            position: result.data.position,
                            division: result.data.division,
                            address: result.data.address,
                            email: result.data.email,
                            phoneNumber: result.data.phoneNumber,
                            birthDate: parseDate(formatDate(result.data.birthDate)),
                            joinDate: parseDate(formatDate(result.data.joinDate)),
                            image: result.data.image
                        }));
                    });
                    setLoading(false)
                    onClose()
                })
            }

        } else {
            const realData = { ...form, birthDate: formatDateStr(form.birthDate), joinDate: formatDateStr(form.joinDate) };
            await updateEmploye(id, realData, (result: any) => {
                console.log(result);
                getEmployeById(id, (result: any) => {
                    setData(result.data)
                    setForm(prevForm => ({
                        ...prevForm,
                        name: result.data.name,
                        position: result.data.position,
                        division: result.data.division,
                        address: result.data.address,
                        email: result.data.email,
                        phoneNumber: result.data.phoneNumber,
                        birthDate: parseDate(formatDate(result.data.birthDate)),
                        joinDate: parseDate(formatDate(result.data.joinDate)),
                        image: result.data.image
                    }));
                });
                setLoading(false)
                onClose()
            })


        }
    }


    // delete action
    const handleDeleteModal = () => {// Tambahkan log untuk memastikan nilai yang diterima
        onWarningOpen();

    };
    const handleDelete = async () => {
        await deleteEmploye(id, (result: any) => {
            console.log(result);
            router.push('/dashboard-super-admin/report')
        })
        onWarningClose();
    }



    return (
        <DefaultLayout>
            <div className="w-full flex justify-end">
                <div className="flex w-fit bg-white justify-end gap-3 p-2 rounded-lg ">
                    <FaTrashAlt onClick={handleDeleteModal} className='cursor-pointer' color='red' />
                    <FaPen onClick={openModalUpdate} className='cursor-pointer' color='blue' />
                </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center min-h-[70vh]">
                <div className="relative w-full h-125 md:h-96" style={{ perspective: '1000px' }}>
                    <div
                        className='flex items-center justify-center rounded-xl p-4 bg-primary'
                    >

                        <div className="text-white px-1 md:px-0 ">
                            <div className="flex flex-col justify-center items-center md:flex-row gap-10">
                                <div className="image flex bg-white rounded-md justify-center items-center h-40 w-40 md:h-56 md:w-56">
                                    <img src={data.image} className="w-full h-full object-cover rounded-xl" />
                                </div>
                                <div className="data-employe space-y-2">
                                    <div className="grid grid-cols-10 gap-x-2">
                                        <p className="col-span-4">Nama</p>
                                        <div className="col-span-6">: {data.name}</div>
                                    </div>

                                    <div className="grid grid-cols-10 gap-x-2">
                                        <p className="col-span-4">Tanggal Lahir</p>
                                        <div className="col-span-6">: {formatDate(data.birthDate)}</div>
                                    </div>

                                    <div className="grid grid-cols-10 gap-x-2">
                                        <p className="col-span-4">No HP</p>
                                        <div className="col-span-6">: {data.phoneNumber}</div>
                                    </div>

                                    <div className="grid grid-cols-10 gap-x-2">
                                        <p className="col-span-4">Alamat</p>
                                        <div className="col-span-6">: {data.address}</div>
                                    </div>

                                    <div className="grid grid-cols-10 gap-x-2">
                                        <p className="col-span-4">Email</p>
                                        <div className="col-span-6">: {data.email}</div>
                                    </div>

                                    <div className="grid grid-cols-10 gap-x-2">
                                        <p className="col-span-4">Divisi</p>
                                        <div className="col-span-6">: {data.division}</div>
                                    </div>

                                    <div className="grid grid-cols-10 gap-x-2">
                                        <p className="col-span-4">Posisi</p>
                                        <div className="col-span-6">: {data.position}</div>
                                    </div>

                                    <div className="grid grid-cols-10 gap-x-2">
                                        <p className="col-span-4">Tanggal Bergabung</p>
                                        <div className="col-span-6">: {formatDate(data.joinDate)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* modal create */}
            <Modal
                scrollBehavior='inside'
                size={'xl'}
                isOpen={isOpen}
                onClose={onClose}
                isDismissable={false} isKeyboardDismissDisabled={true}
            >
                <ModalContent>
                    <>
                        <ModalBody className={`overflow-x-hidden `}>
                            <form action="">
                                <div className="images  my-4">

                                    {form.image && form.image instanceof Blob ? (
                                        <>
                                            <div className='relative h-[90px] w-[90px] mx-auto '>
                                                <img className=" h-[90px] w-[90px]  rounded-full border-3 border-primary" src={URL.createObjectURL(form.image)} />
                                                <div className=" absolute bottom-0 right-0 ">
                                                    <button className={` bg-primary rounded-full p-2 ${form.image === null ? 'hidden' : ''}`} type="button" onClick={() => handleFileManager('add')}>
                                                        <FaPen color='#ffff' />
                                                    </button>
                                                </div>
                                            </div>
                                            <p className='text-red text-center text-sm my-1' >{errorMsg.image}</p>
                                        </>

                                    ) : (

                                        <>

                                            <div className='relative h-[90px] w-[90px] mx-auto '>
                                                <img className=" h-[90px] w-[90px]  rounded-full border-3 border-primary" src={form.image ? form.image : ''} />
                                                <div className=" absolute bottom-0 right-0 ">
                                                    <button className={` bg-primary rounded-full p-2 ${form.image === null ? 'hidden' : ''}`} type="button" onClick={() => handleFileManager('add')}>
                                                        <FaPen color='#ffff' />
                                                    </button>
                                                </div>
                                            </div>
                                            <p className='text-red text-center text-sm my-1' >{errorMsg.image}</p>
                                        </>

                                    )}

                                    <input
                                        type="file"
                                        className="hidden"
                                        id="image-input-add"
                                        onChange={(e) => handleImageChange(e, 'add')}
                                    />

                                </div>

                                <div className="data-input my-3">
                                    <InputForm title='Nama' className='bg-slate-200' htmlFor="name" type="text" onChange={handleChange} value={form.name} />
                                    <div className="flex gap-3">
                                        <InputForm title='Email' className='bg-slate-200' htmlFor="email" type="text" onChange={handleChange} value={form.email} />
                                        <InputForm title='No HP' className='bg-slate-200' htmlFor="phoneNumber" type="text" onChange={handleChange} value={form.phoneNumber} />
                                    </div>
                                    <div className="flex gap-3">
                                        <InputForm title='Divisi' className='bg-slate-200' htmlFor="divisi" type="text" onChange={handleChange} value={form.division} />
                                        <InputForm title='Posisi' className='bg-slate-200' htmlFor="position" type="text" onChange={handleChange} value={form.position} />
                                    </div>

                                    <div className="flex gap-8 mb-2">
                                        <DatePicker showMonthAndYearPickers value={form.birthDate} label={"Tanggal Lahir"} variant={'underlined'} onChange={(e) => setForm({ ...form, birthDate: e })} />
                                        <DatePicker showMonthAndYearPickers value={form.joinDate} label={"Tanggal Bergabung"} variant={'underlined'} onChange={(e) => setForm({ ...form, joinDate: e })} />
                                    </div>

                                    <InputForm title='Alamat' className='bg-slate-200 ' htmlFor="address" type="text" onChange={handleChange} value={form.address} />

                                    <div className="flex justify-end my-2">
                                        <ButtonPrimary className='px-4 py-2 rounded-md' typeButon={'submit'} onClick={handleUpdate} >{loading ? <Spinner className={`w-5 h-5 mx-8`} size="sm" color="white" /> : 'Simpan'}  </ButtonPrimary>
                                    </div>
                                </div>



                            </form>
                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>

            {/* Warning Modal */}
            <ModalAlert isOpen={isWarningOpen} onClose={onWarningClose}>
                <p> Apakah Anda yakin ingin menghapus karyawan tersebut ?</p>
                <div className="flex justify-end gap-4 mt-4">
                    <ButtonPrimary onClick={onWarningClose} className="bg-gray-300 text-black rounded-md px-3 py-2">Batal</ButtonPrimary>
                    <ButtonPrimary onClick={handleDelete} className="bg-red text-white rounded-md  px-3 py-2">Hapus</ButtonPrimary>
                </div>
            </ModalAlert>

        </DefaultLayout>
    )
}

export default Page
