'use client'

import { register } from "@/api/auth";
import { getAllUnitWork } from "@/api/unitWork";
import { deleteUser, getAllUser } from "@/api/user";
import ButtonPrimary from "@/components/elements/buttonPrimary";
import Card from "@/components/elements/card/Card";
import InputReport from "@/components/elements/input/InputReport";
import ModalDefault from "@/components/fragemnts/modal/modal";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { capitalizeWords } from "@/utils/helper";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";

const OfficerList = () => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { isOpen: isWarningOpen, onOpen: onWarningOpen, onClose: onWarningClose } = useDisclosure();
    const [disabled, setDisabled] = useState(true)
    const [errorMsg, setErrorMsg] = useState(' ')
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
        })
    }, []);


    const handleAddCategory = () => {
        onOpen();
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        const updatedValues = {
            ...formData,
            [name]: value,
        };

        if (updatedValues.email !== "" && updatedValues.password !== "" && (updatedValues.email.includes('@gmail.com') || updatedValues.email.includes('@test.com'))) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
        const nameRegex = /^[A-Za-z\s\-\_\'\.\,\&\(\)]{1,100}$/; //validasi nama
        const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/ //validasi email
        const passwordRegex = /^[A-Za-z0-9]+$/ //validasi password
        if (!nameRegex.test(formData.name)) {
            setErrorMsg('*Masukan nama yang valid')
            setDisabled(true);
        } else if (!emailRegex.test(formData.email)) {
            setDisabled(true);
            setErrorMsg('*Masukan email yang valid')
        } else if (!passwordRegex.test(formData.password) || formData.password.length < 8) {
            setDisabled(true);
            setErrorMsg('*Password harus 8 karakter atau lebih')
        } else {
            setDisabled(false);
            setErrorMsg('')
        }
    };


    //membuat petugas
    const createOfficer = async (e: any) => {
        e.preventDefault();
        console.log(formData);

        await register(formData, (status: boolean, res: any) => {
            console.log(register);

            if (status) {
                console.log(res);
                setFormData({
                    name: ' ',
                    email: '',
                    unitWork: '',
                    number_phone: '',
                    nik: " ",
                    password: '',
                    role: 'admin'
                })

                getAllUser((result: any) => {
                    const data = result.data ? result.data.filter((role: any) =>
                        role.role !== 'user') : [];
                    setDataUser(data)
                })
                onClose();
            } else {
                console.log(res);
            }
        })


    }

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
                        {dataUser?.map((user: any, index: any) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{capitalizeWords(user.name)}</TableCell>
                                <TableCell>{capitalizeWords(user.email)}</TableCell>
                                <TableCell>{capitalizeWords(user.number_phone)}</TableCell>
                                <TableCell>{capitalizeWords(user.role)}</TableCell>
                                <TableCell>{user.unitWork ? capitalizeWords(user.unitWork.name) : '-'}</TableCell>
                                <TableCell><ButtonPrimary className="bg-red-700 rounded-md w-full py-2"
                                    onClick={() => handleDeleteModal(user.id)}>Delete</ButtonPrimary></TableCell>
                            </TableRow>
                        ))}

                        {/* key nya di buat index */}
                    </TableBody>
                </Table>
            </Card>

            <ModalDefault isOpen={isOpen} onClose={onClose}>
                <InputReport marginY="my-1" htmlFor="nik" title="NIK  " type="number" onChange={handleChange} value={formData.nik} />
                <InputReport marginY="my-1" htmlFor="name" title="Nama Petugas  " type="text" onChange={handleChange} value={formData.name} />
                <div className="flex justify-between">
                    <InputReport marginY="my-1" htmlFor="email" title="Email  " type="text" onChange={handleChange} value={formData.email} />
                    <InputReport marginY="my-1" htmlFor="number_phone" title="No HP  " type="number" onChange={handleChange} value={formData.number_phone} />
                </div>


                <InputReport marginY="my-1" htmlFor="password" title="Password " type="text" onChange={handleChange} value={formData.password} />
                <p className="text-red-600">{errorMsg}</p>
                <ButtonPrimary disabled={disabled} className={`rounded-md w-full my-4 py-2 ${disabled ? 'bg-slate-400' : 'bg-primary'}`} onClick={createOfficer} >Buat Petugas</ButtonPrimary>

            </ModalDefault>

            {/* Warning Modal */}
            <ModalDefault isOpen={isWarningOpen} onClose={onWarningClose}>
                <h2 className="text-lg font-semibold">Peringatan</h2>
                <p> apakah Anda yakin ingin menghapus petugas tersebut ?</p>
                <div className="flex justify-end gap-4 mt-4">
                    <ButtonPrimary onClick={onWarningClose} className="bg-gray-300 text-black rounded-md px-3 py-2">Batal</ButtonPrimary>
                    <ButtonPrimary onClick={handleDelete} className="bg-red text-white rounded-md  px-3 py-2">Hapus</ButtonPrimary>
                </div>
            </ModalDefault>
        </DefaultLayout>
    )
}

export default OfficerList