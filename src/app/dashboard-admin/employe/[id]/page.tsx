'use client'

import { getEmployeById, updateEmploye } from '@/api/employe'
import { postImage } from '@/api/imagePost'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import InputForm from '@/components/elements/input/InputForm'
import ModalDefault from '@/components/fragemnts/modal/modal'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { formatDate, formatDateStr } from '@/utils/helper'
import { parseDate } from '@internationalized/date'
import { DatePicker, Modal, ModalBody, ModalContent, Spinner, useDisclosure } from '@nextui-org/react'
import { useParams } from 'next/navigation'
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


const page = (props: Props) => {
    const dateNow = new Date();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false)
    const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const { id }: any = useParams()
    const [data, setData] = useState({} as Employee)
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




    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const card = e.currentTarget.getBoundingClientRect();
        const rotateX = ((e.clientY - card.top) / card.height - 0.5) * 20;
        const rotateY = ((e.clientX - card.left) / card.width - 0.5) * -20;
        setRotation({ rotateX, rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ rotateX: 0, rotateY: 0 });
        setIsHovered(false); // Reset scale and rotation on mouse leave
    };

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
            setForm({ ...form, image: selectedImage || null });
        } else {
            console.log('error');

        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };



    // action update
    const handleUpdate = async (e: any) => {
        e.preventDefault()
        setLoading(true)
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




    return (
        <DefaultLayout>
            <div className="w-full flex justify-end">
                <div className="flex w-fit bg-white justify-end gap-3 p-2 rounded-lg ">
                    <FaTrashAlt className='cursor-pointer' color='red' />
                    <FaPen onClick={openModalUpdate} className='cursor-pointer' color='blue' />
                </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center min-h-[70vh]">
                <div className="relative w-full h-125 md:h-96" style={{ perspective: '1000px' }}>
                    <div
                        id="card"
                        className={`absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-yellow-500 transition-transform duration-500 ease-out ${isHovered ? "scale-95" : "scale-100"
                            }`}
                        style={{
                            transform: `rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`,
                            transitionTimingFunction: 'ease-out',
                        }}
                        onMouseMove={(e) => {
                            handleMouseMove(e);
                            setIsHovered(true);
                        }}
                        onMouseLeave={handleMouseLeave}
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


            {/* modal */}
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
                                        <div className='relative h-[90px] w-[90px] mx-auto '>
                                            <img className=" h-[90px] w-[90px]  rounded-full border-3 border-primary" src={URL.createObjectURL(form.image)} />
                                            <div className=" absolute bottom-0 right-0 ">
                                                <button className={` bg-primary rounded-full p-2 ${form.image === null ? 'hidden' : ''}`} type="button" onClick={() => handleFileManager('add')}>
                                                    <FaPen color='#ffff' />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='relative h-[90px] w-[90px] mx-auto '>
                                            <img className=" h-[90px] w-[90px]  rounded-full border-3 border-primary" src={form.image ? form.image : ''} />
                                            <div className=" absolute bottom-0 right-0 ">
                                                <button className={` bg-primary rounded-full p-2 ${form.image === null ? 'hidden' : ''}`} type="button" onClick={() => handleFileManager('add')}>
                                                    <FaPen color='#ffff' />
                                                </button>
                                            </div>
                                        </div>
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

                                    <div className="flex gap-8">
                                        <DatePicker value={form.birthDate} label={"Tanggal Lahir"} variant={'underlined'} onChange={(e) => setForm({ ...form, birthDate: e })} />
                                        <DatePicker value={form.joinDate} label={"Tanggal Bergabung"} variant={'underlined'} onChange={(e) => setForm({ ...form, joinDate: e })} />
                                    </div>

                                    <InputForm title='Alamat' className='bg-slate-200' htmlFor="address" type="text" onChange={handleChange} value={form.address} />

                                    <div className="flex justify-end my-2">
                                        <ButtonPrimary className='px-4 py-2 rounded-md' typeButon={'submit'} onClick={handleUpdate} >{loading ? <Spinner className={`w-5 h-5 mx-8`} size="sm" color="white" /> : 'Simpan'}  </ButtonPrimary>
                                    </div>
                                </div>



                            </form>
                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>

        </DefaultLayout>
    )
}

export default page
