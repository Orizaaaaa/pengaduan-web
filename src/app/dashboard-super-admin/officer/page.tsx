'use client'

import { registerUser } from "@/api/auth"; import { postImage } from "@/api/imagePost";
;
import { deleteUser, getAllUser } from "@/api/user";
import { camera } from "@/app/image";
import ButtonDelete from "@/components/elements/buttonDelete";
import ButtonPrimary from "@/components/elements/buttonPrimary";
import Card from "@/components/elements/card/Card";
import InputForm from "@/components/elements/input/InputForm";
import InputReport from "@/components/elements/input/InputReport";
import ModalDefault from "@/components/fragemnts/modal/modal";
import Search from "@/components/fragemnts/search/Search";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { capitalizeWords } from "@/utils/helper";
import { Skeleton, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";

const OfficerList = () => {
    const [searchData, setSearchData] = useState("");
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
        image: '',
        message: ''
    })
    const [dataUser, setDataUser] = useState([]);
    const [formData, setFormData] = useState({
        image: null as File | null,
        name: ' ',
        nik: '',
        number_phone: '',
        email: '',
        unitWork: '',
        password: '',
        role: 'admin',
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
                        image: '*',
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

    const handleSearch = (e: any) => {
        setSearchData(e.target.value);
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
            password: '',
            image: '',
            message: ''
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
        if (!formData.image) {
            setErrorMsg((prev) => ({ ...prev, image: '*Foto profil harus diunggah' }));
            hasError = true;
        }

        if (hasError) {
            setLoading(false); // Selesai loading jika ada error
            return;
        }

        const imageUrl = await postImage({ image: formData.image });
        if (imageUrl) {
            const data = { ...formData, image: imageUrl };
            await registerUser(data, (status: boolean, res: any) => {
                if (status) {
                    setFormData({
                        image: null as File | null,
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
                    if (res?.response?.data?.data?.error) {
                        if (res?.response?.data?.data?.error === 'Email has been used') {
                            setErrorMsg((prev) => ({ ...prev, message: 'Email telah di gunakan' }));
                        }

                    } else {
                        console.log('Error occurred:', res);
                    }
                }
                setLoading(false); // Selesai loading setelah create selesai
            });
        }



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

    const filteredData = dataUser?.filter((item: any) => {
        return (
            item.name && item.name.toLowerCase().includes(searchData.toLowerCase())

        );
    });
    console.log(dataUser);


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

                <div className="filtered space-y-3 md:space-y-0 md:flex justify-between w-full items-center gap-10 my-3">
                    <ButtonPrimary onClick={handleAddCategory} className='py-2 px-4 rounded-md' >Tambah Petugas</ButtonPrimary>
                    <div className="w-full md:w-auto">
                        <Search onChange={handleSearch} className='border-2 border-black' placeholder="Cari Petugas..." />
                    </div>
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
                            filteredData?.map((user: any, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{capitalizeWords(user.name)}</TableCell>
                                    <TableCell>{user.email}</TableCell>
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

                <div className="images ">
                    {formData.image && formData.image instanceof Blob ? (
                        <div className='relative h-[90px] w-[90px] mx-auto '>
                            <img className=" h-[90px] w-[90px]  rounded-full border-3 border-primary" src={URL.createObjectURL(formData.image)} />
                            <div className=" absolute bottom-0 right-0 ">
                                <button className={` bg-primary rounded-full p-2 ${formData.image === null ? 'hidden' : ''}`} type="button" onClick={() => handleFileManager('add')}>
                                    <FaPen color='#ffff' />
                                </button>
                            </div>
                        </div>

                    ) : (
                        <>
                            <div className="images mx-auto border-dashed border-2 border-black rounded-full bg-gray-300 h-[80px] w-[80px] flex justify-center items-center relative">
                                <button className="flex-col justify-center items-center h-full w-full" type="button" onClick={() => handleFileManager('add')}>
                                    <Image className="w-10 h-10 mx-auto" src={camera} alt="cam" />
                                </button>
                            </div>
                            <p className='text-center mt-2 text-small text-red' >{errorMsg.image}</p>
                        </>
                    )}
                    <input
                        type="file"
                        className="hidden"
                        id="image-input-add"
                        onChange={(e) => handleImageChange(e, 'add')}
                    />

                </div>

                <InputForm errorMsg={errorMsg.nik} className="bg-slate-300" type="text" htmlFor="nik" title="NIK  " onChange={handleChange} value={formData.nik} />
                <InputForm errorMsg={errorMsg.name} className="bg-slate-300" htmlFor="name" title="Nama Petugas  " type="text" onChange={handleChange} value={formData.name} />
                <div className="flex justify-between">
                    <InputForm errorMsg={errorMsg.email} className="bg-slate-300" htmlFor="email" title="Email  " type="text" onChange={handleChange} value={formData.email} />
                    <InputForm errorMsg={errorMsg.number_phone} className="bg-slate-300" htmlFor="number_phone" title="No HP  " type="text" onChange={handleChange} value={formData.number_phone} />
                </div>


                <InputForm errorMsg={errorMsg.password} className="bg-slate-300" htmlFor="password" title="Password " type="text" onChange={handleChange} value={formData.password} />
                <p className="text-red text-sm" >{errorMsg.message}</p>
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