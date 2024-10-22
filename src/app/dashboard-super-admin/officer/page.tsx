'use client'

import { registerUser } from "@/api/auth";;
import { deleteUser, getAllUser } from "@/api/user";
import ButtonDelete from "@/components/elements/buttonDelete";
import ButtonPrimary from "@/components/elements/buttonPrimary";
import Card from "@/components/elements/card/Card";
import InputForm from "@/components/elements/input/InputForm";
import InputReport from "@/components/elements/input/InputReport";
import ModalDefault from "@/components/fragemnts/modal/modal";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { capitalizeWords } from "@/utils/helper";
import { Skeleton, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";

const OfficerList = () => {
    const [loadingUi, setLoadingUi] = useState(true)
    const { onOpen, onClose, isOpen } = useDisclosure();
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [loading, setLoading] = useState(false)
    const { isOpen: isWarningOpen, onOpen: onWarningOpen, onClose: onWarningClose } = useDisclosure();
    const [errorMsg, setErrorMsg] = useState({
        name: '',
        nik: '',
        number_phone: '',
        email: '',
        unitWork: '',
        password: '',
    })
    const [dataUser, setDataUser] = useState([]);
    const [formData, setFormData] = useState({
        name: ' ',
        nik: '',
        number_phone: '',
        email: '',
        unitWork: '',
        password: '',
        role: 'admin'
    })
    const [dataDelete, setDataDelete] = useState('')

    //get all user
    useEffect(() => {
        getAllUser((result: any) => {
            console.log(result);
            const data = result.data ? result.data.filter((role: any) =>
                role.role === 'admin') : [];
            setDataUser(data)
            setLoadingUi(false)
        })
    }, []);


    const handleAddCategory = () => {
        onOpen();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Khusus validasi untuk nomor telepon
        if (name === 'number_phone') {
            let numericValue = value.replace(/\D/g, '');

            if (numericValue.startsWith('08')) {
                numericValue = '628' + numericValue.slice(2);
            }

            if (numericValue.length > 15) {
                setErrorMsg((prev) => ({
                    ...prev,
                    number_phone: '*Nomor tidak boleh lebih dari 15 angka',
                }));
                return;
            } else {
                setErrorMsg((prev) => ({
                    ...prev,
                    number_phone: '',
                }));
            }

            setFormData({ ...formData, [name]: numericValue });
            return;
        }

        // Khusus untuk validasi NIK
        if (name === 'nik') {
            const numericValue = value.replace(/\D/g, '');

            if (numericValue.length > 16) {
                setErrorMsg((prev) => ({
                    ...prev,
                    nik: '*NIK tidak boleh lebih dari 16 digit',
                }));
                return;
            } else {
                setErrorMsg((prev) => ({
                    ...prev,
                    nik: '',
                }));
            }

            setFormData({ ...formData, [name]: numericValue });
            return;
        }

        // Validasi agar name tidak boleh berisi angka
        if (name === 'name') {
            const nameValue = value;
            const hasNumber = /\d/.test(nameValue);

            if (hasNumber) {
                setErrorMsg((prev) => ({
                    ...prev,
                    name: '*Nama tidak boleh mengandung angka',
                }));
                return;
            } else {
                setErrorMsg((prev) => ({
                    ...prev,
                    name: '',
                }));
            }
        }

        // Update state untuk input lainnya
        setFormData({ ...formData, [name]: value });
    };



    //membuat petugas
    const createOfficer = async (e: any) => {
        e.preventDefault();
        setLoading(true); // Mulai loading

        setErrorMsg({
            name: '',
            email: '',
            unitWork: '',
            number_phone: '',
            nik: '',
            password: ''
        });

        let hasError = false;
        if (formData.name.trim() === '') {
            setErrorMsg((prev) => ({ ...prev, name: '*Nama tidak boleh kosong' }));
            hasError = true;
        }
        if (formData.email.trim() === '') {
            setErrorMsg((prev) => ({ ...prev, email: '*Email tidak boleh kosong' }));
            hasError = true;
        }
        if (formData.number_phone.trim() === '') {
            setErrorMsg((prev) => ({ ...prev, number_phone: '*Nomor telepon tidak boleh kosong' }));
            hasError = true;
        }
        if (formData.nik.trim() === '') {
            setErrorMsg((prev) => ({ ...prev, nik: '*NIK tidak boleh kosong' }));
            hasError = true;
        }
        if (formData.password.trim() === '') {
            setErrorMsg((prev) => ({ ...prev, password: '*Password tidak boleh kosong' }));
            hasError = true;
        }

        if (hasError) {
            setLoading(false); // Selesai loading jika ada error
            return;
        }

        await registerUser(formData, (status: boolean, res: any) => {
            if (status) {
                setFormData({
                    name: ' ',
                    email: '',
                    unitWork: '',
                    number_phone: '',
                    nik: ' ',
                    password: '',
                    role: 'admin'
                });
                getAllUser((result: any) => {
                    console.log(result);
                    const data = result.data ? result.data.filter((role: any) =>
                        role.role === 'admin') : [];
                    setDataUser(data)
                })
                onClose();
            } else {
                if (res?.data?.message) {
                    setErrorMsg((prev) => ({
                        ...prev,
                        ...res.data.message
                    }));
                } else {
                    console.log('Error occurred:', res);
                }
            }
            setLoading(false); // Selesai loading setelah create selesai
        });
    };


    //hapus petugas
    const handleDeleteModal = (value: any) => {
        console.log("Value received:", value); // Tambahkan log untuk memastikan nilai yang diterima
        onWarningOpen();
        setDataDelete(value);
    };

    const handleDelete = async () => {
        setLoadingDelete(true); // Mulai loading delete

        await deleteUser(dataDelete, (result: any) => {
            getAllUser((result: any) => {
                console.log(result);
                const data = result.data ? result.data.filter((role: any) =>
                    role.role === 'admin') : [];
                setDataUser(data)
            })
            setLoadingDelete(false); // Selesai loading delete
            onWarningClose();
        });
    };

    return (
        <DefaultLayout>

            <div className="rounded-md  bg-white p-4 lg:px-7.5 lg:py-6 shadow-default dark:border-strokedark mb-4">
                <div className=" rounded-full ">
                    <div className="grid ">
                        <div className="flex-col space-y-3 my-auto">
                            <h1 className=" text-lg font-semibold md:text-2xl md:font-bold font-inter" >Halaman Petugas </h1>
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
                        <TableColumn>ROLE</TableColumn>
                        <TableColumn>UNIT KERJA</TableColumn>
                        <TableColumn>ACTION</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {loadingUi ? (
                            // Render skeleton rows during loading
                            Array.from({ length: 5 }).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell><Skeleton className="h-6 w-full rounded-md" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-full rounded-md" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-full rounded-md" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-full rounded-md" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-full rounded-md" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-full rounded-md" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-full rounded-md" /></TableCell>
                                </TableRow>
                            ))
                        ) : (
                            dataUser?.map((user: any, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{capitalizeWords(user.name)}</TableCell>
                                    <TableCell>{capitalizeWords(user.email)}</TableCell>
                                    <TableCell>{capitalizeWords(user.number_phone)}</TableCell>
                                    <TableCell>{capitalizeWords(user.role)}</TableCell>
                                    <TableCell>{user.unitWork ? capitalizeWords(user.unitWork.name) : '-'}</TableCell>
                                    <TableCell>
                                        <ButtonDelete className="rounded-md w-full py-2"
                                            onClick={() => handleDeleteModal(user.id)}>Delete</ButtonDelete>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>

            <ModalDefault isOpen={isOpen} onClose={onClose}>
                <InputForm errorMsg={errorMsg.nik} className="bg-slate-300" type="text" htmlFor="nik" title="NIK  " onChange={handleChange} value={formData.nik} />
                <InputForm errorMsg={errorMsg.name} className="bg-slate-300" htmlFor="name" title="Nama Petugas  " type="text" onChange={handleChange} value={formData.name} />
                <div className="flex justify-between">
                    <InputForm errorMsg={errorMsg.email} className="bg-slate-300" htmlFor="email" title="Email  " type="text" onChange={handleChange} value={formData.email} />
                    <InputForm errorMsg={errorMsg.number_phone} className="bg-slate-300" htmlFor="number_phone" title="No HP  " type="text" onChange={handleChange} value={formData.number_phone} />
                </div>


                <InputForm errorMsg={errorMsg.password} className="bg-slate-300" htmlFor="password" title="Password " type="text" onChange={handleChange} value={formData.password} />
                <ButtonPrimary onClick={createOfficer} className='px-4 py-2
                 rounded-md flex justify-center items-center'> {loading ? <Spinner
                        className={`w-5 h-5 mx-8`} size="sm" color="white" />
                        : 'Buat Petugas'}  </ButtonPrimary>

            </ModalDefault>

            {/* Warning Modal */}
            <ModalDefault isOpen={isWarningOpen} onClose={onWarningClose}>
                <h2 className="text-lg font-semibold">Peringatan</h2>
                <p> apakah Anda yakin ingin menghapus petugas tersebut ?</p>
                <div className="flex justify-end gap-4 mt-4">
                    <ButtonPrimary onClick={onWarningClose} className="bg-gray-300 text-black rounded-md px-3 py-2">Batal</ButtonPrimary>
                    <ButtonDelete onClick={handleDelete}
                        className='px-4 py-2 rounded-md flex justify-center items-center'>{loadingDelete ? <Spinner className={`w-5 h-5 mx-8`} size="sm" color="white" /> : 'Ya, Hapus'}</ButtonDelete>
                </div>
            </ModalDefault>
        </DefaultLayout>
    )
}

export default OfficerList