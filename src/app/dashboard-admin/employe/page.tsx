'use client'

import { register } from "@/api/auth";
import { getAllEmploye } from "@/api/employe";
import { getAllUnitWork } from "@/api/unitWork";
import { deleteUser, getAllUser } from "@/api/user";
import ButtonDelete from "@/components/elements/buttonDelete";
import ButtonPrimary from "@/components/elements/buttonPrimary";
import Card from "@/components/elements/card/Card";
import InputForm from "@/components/elements/input/InputForm";
import InputReport from "@/components/elements/input/InputReport";
import ModalDefault from "@/components/fragemnts/modal/modal";
import ModalAlert from "@/components/fragemnts/modal/modalAlert";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { capitalizeWords, formatDate } from "@/utils/helper";
import { parseDate } from "@internationalized/date";
import { DatePicker, Modal, ModalBody, ModalContent, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
    const dateNow = new Date();
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { isOpen: isWarningOpen, onOpen: onWarningOpen, onClose: onWarningClose } = useDisclosure();
    const [disabled, setDisabled] = useState(true)
    const [errorMsg, setErrorMsg] = useState(' ')
    const [loading, setLoading] = useState(false)
    const [dataUser, setDataUser] = useState([]);
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
    const [dataDelete, setDataDelete] = useState('')

    //get all user
    useEffect(() => {
        getAllEmploye((result: any) => {
            console.log(result);
            setDataUser(result.data);
        })
    }, []);


    const handleAddCategory = () => {
        onOpen();
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
            setForm({ ...form, image: selectedImage || null });
        } else {
            console.log('error');

        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    //hapus petugas
    const handleDeleteModal = (value: any) => {
        console.log("Value received:", value); // Tambahkan log untuk memastikan nilai yang diterima
        onWarningOpen();
        setDataDelete(value);
    };
    const handleDelete = async () => {
        await deleteUser(dataDelete, (result: any) => {
            console.log(result);
            getAllUser((result: any) => {
                const data = result.data ? result.data.filter((role: any) =>
                    role.role !== 'user') : [];
                setDataUser(data)
            })
        })
        onWarningClose();
    }

    console.log(dataUser);


    return (
        <DefaultLayout>

            <div className="rounded-md  bg-white p-4 lg:px-7.5 lg:py-6 shadow-default dark:border-strokedark mb-4">
                <div className=" rounded-full ">
                    <div className="grid ">
                        <div className="flex-col space-y-3 my-auto">
                            <h1 className=" text-lg font-semibold md:text-2xl md:font-bold font-inter" >Halaman karyawan </h1>
                            <p className="text-gray-500 text-sm md:text-base" >Ini adalah halaman kategori anda dapat menambah atau menghapus seorang petugas</p>
                        </div>
                    </div>
                </div>
            </div>


            <Card>
                <div className="flex justify-end my-5">
                    <ButtonPrimary className=" rounded-md py-2 px-4" onClick={handleAddCategory} >Tambah Petugas</ButtonPrimary>
                </div>


                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>N0</TableColumn>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>EMAIL</TableColumn>
                        <TableColumn>NO HP</TableColumn>
                        <TableColumn>DIVISI</TableColumn>
                        <TableColumn>TANGGAL LAHIR</TableColumn>
                        <TableColumn>ACTION</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {dataUser?.map((user: any, index: any) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{<Link href={`/dashboard-admin/employe/${user._id}`}>{capitalizeWords(user.name)}</Link>}</TableCell>
                                <TableCell>{(user.email)}</TableCell>
                                <TableCell>{user.phoneNumber}</TableCell>
                                <TableCell>{capitalizeWords(user.division)}</TableCell>
                                <TableCell>{formatDate(user.joinDate)}</TableCell>
                                <TableCell><ButtonDelete className="bg-red rounded-md w-full py-2"
                                    onClick={() => handleDeleteModal(user.id)}>Delete</ButtonDelete></TableCell>
                            </TableRow>
                        ))}

                        {/* key nya di buat index */}
                    </TableBody>
                </Table>
            </Card>

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
                                <div className="images ">

                                    {form.image && form.image instanceof Blob ? (
                                        <img className="h-[100px] w-auto mx-auto rounded-md" src={URL.createObjectURL(form.image)} />
                                    ) : (
                                        <div className="images  rounded-md h-[100px] bg-gray-300 p-2">
                                            <button className="flex-col justify-center items-center h-full w-full " type="button" onClick={() => handleFileManager('add')} >
                                                <img className="w-auto h-full mx-auto rounded-md" src={form.image ? form.image : ''} alt='cam' />
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
                                        <button className={`border-2 border-primary  text-primary px-4 py-2 rounded-md ${form.image === null ? 'hidden' : ''}`} type="button" onClick={() => handleFileManager('add')} >Ubah Gambar</button>
                                    </div>
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
                                        <ButtonPrimary className='px-4 py-2 rounded-md' typeButon={'submit'}  >{loading ? <Spinner className={`w-5 h-5 mx-8`} size="sm" color="white" /> : 'Simpan'}  </ButtonPrimary>
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