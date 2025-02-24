'use client'
    ;
import { createEmploye, deleteEmploye, getAllEmploye } from "@/api/employe";
import { postImage } from "@/api/imagePost";
import { camera } from "@/app/image";
import ButtonDelete from "@/components/elements/buttonDelete";
import ButtonPrimary from "@/components/elements/buttonPrimary";
import Card from "@/components/elements/card/Card";
import InputForm from "@/components/elements/input/InputForm";
import ModalAlert from "@/components/fragemnts/modal/modalAlert";
import Search from "@/components/fragemnts/search/Search";
import SearchNotFound from "@/components/fragemnts/SearchNotFound/SearchNotFound";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { capitalizeWords, formatDate, formatDateStr } from "@/utils/helper";
import { parseDate } from "@internationalized/date";
import { DatePicker, Modal, ModalBody, ModalContent, Skeleton, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";

const Page = () => {
    const [searchData, setSearchData] = useState("");
    const [loadingUi, setLoadingUi] = useState(true)
    const dateNow = new Date();
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { isOpen: isWarningOpen, onOpen: onWarningOpen, onClose: onWarningClose } = useDisclosure();
    const [errorMsg, setErrorMsg] = useState({
        name: '',
        position: '',
        division: '',
        address: '',
        email: '',
        phoneNumber: '',
        image: '',
    })

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


    const handleSearch = (e: any) => {
        setSearchData(e.target.value);
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


    //hapus petugas
    const handleDeleteModal = (value: any) => {
        console.log("Value received:", value); // Tambahkan log untuk memastikan nilai yang diterima
        onWarningOpen();
        setDataDelete(value);
    };
    const handleDelete = async () => {
        await deleteEmploye(dataDelete, (result: any) => {
            console.log(result);
            getAllEmploye((result: any) => {
                console.log(result);
                setDataUser(result.data);
            })
        })
        onWarningClose();
    }

    //create karyawan
    const handleCreate = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        // Cek apakah ada field yang kosong
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

        // Jika tidak ada error, lanjutkan proses upload gambar dan pembuatan user
        if (form.image instanceof Blob) {
            const imageUrl = await postImage({ image: form.image });

            if (imageUrl) {
                const data: any = {
                    ...form,
                    image: imageUrl,
                    birthDate: formatDateStr(form.birthDate),
                    joinDate: formatDateStr(form.joinDate)
                };

                createEmploye(data, (result: any) => {
                    console.log(result);
                    setLoading(false);
                    onClose();

                    // Ambil data pengguna terbaru setelah ditambahkan
                    getAllEmploye((result: any) => {
                        console.log(result);
                        setDataUser(result.data);
                    });
                });
            }
        }
    };



    const filteredData = dataUser?.filter((item: any) => {
        return (
            item.name && item.name.toLowerCase().includes(searchData.toLowerCase())

        );
    });



    return (
        <DefaultLayout>

            <div className="rounded-md  bg-white p-4 lg:px-7.5 lg:py-6 shadow-default dark:border-strokedark mb-4">
                <div className=" rounded-full ">
                    <div className="grid ">
                        <div className="flex-col space-y-3 my-auto">
                            <h1 className=" text-lg font-semibold md:text-2xl md:font-bold font-inter" >Halaman karyawan </h1>
                            <p className="text-gray-500 text-sm md:text-base" >Ini adalah halaman karyawan anda dapat menambah atau menghapus seorang karyawan</p>
                        </div>
                    </div>
                </div>
            </div>


            <Card>
                <div className="filtered space-y-3 md:space-y-0 md:flex justify-between w-full items-center gap-10 my-3">
                    <ButtonPrimary onClick={handleAddCategory} className='py-2 px-4 rounded-md' >Tambah Karyawan</ButtonPrimary>
                    <div className="w-full md:w-auto">
                        <Search onChange={handleSearch} className='border-2 border-black' placeholder="Cari Karyawan..." />
                    </div>
                </div>


                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>FOTO</TableColumn>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>EMAIL</TableColumn>
                        <TableColumn>NO HP</TableColumn>
                        <TableColumn>DIVISI</TableColumn>
                        <TableColumn>TANGGAL LAHIR</TableColumn>
                        <TableColumn>ACTION</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={
                        <SearchNotFound height="200px" width="400px" text="Data tidak di temukan" />
                    }>

                        {loadingUi ?
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
                            )) :
                            (filteredData?.map((user: any, index: any) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {<div className="h-10 w-10 rounded-full bg-primary">
                                            <img className=" w-full h-full rounded-full object-cover " src={user.image} alt="" />
                                        </div>
                                        }</TableCell>
                                    <TableCell>{<Link className="flex items-center gap-2 underline" href={`/dashboard-super-admin/employe/${user._id}`}>
                                        <p  >{capitalizeWords(user.name)}</p>
                                    </Link>}</TableCell>
                                    <TableCell>{(user.email)}</TableCell>
                                    <TableCell>{user.phoneNumber}</TableCell>
                                    <TableCell>{capitalizeWords(user.division)}</TableCell>
                                    <TableCell>{formatDate(user.joinDate)}</TableCell>
                                    <TableCell><ButtonDelete className="bg-red rounded-md w-full py-2"
                                        onClick={() => handleDeleteModal(user._id)}>Delete</ButtonDelete></TableCell>
                                </TableRow>
                            )))

                        }




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
                            <form onSubmit={handleCreate}>
                                <div className="images my-3">
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
                                            <p className="text-center text-red mt-2" >{errorMsg.image}</p>
                                        </>

                                    ) : (
                                        <>

                                            <div className="images mx-auto border-dashed border-2 border-black rounded-full bg-gray-300 h-[80px] w-[80px] flex justify-center items-center relative">
                                                <button className="flex-col justify-center items-center h-full w-full" type="button" onClick={() => handleFileManager('add')}>
                                                    <Image className="w-10 h-10 mx-auto" src={camera} alt="cam" />
                                                </button>
                                            </div>
                                            <p className="text-center text-red mt-2" >{errorMsg.image}</p>
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
                                    <InputForm errorMsg={errorMsg.name} title='Nama' className='bg-slate-200' htmlFor="name" type="text" onChange={handleChange} value={form.name} />
                                    <div className="flex gap-3">
                                        <InputForm errorMsg={errorMsg.email} title='Email' className='bg-slate-200' htmlFor="email" type="text" onChange={handleChange} value={form.email} />
                                        <InputForm errorMsg={errorMsg.phoneNumber} title='No HP' className='bg-slate-200' htmlFor="phoneNumber" type="text" onChange={handleChange} value={form.phoneNumber} />
                                    </div>
                                    <div className="flex gap-3">
                                        <InputForm errorMsg={errorMsg.division} title='Divisi' className='bg-slate-200' htmlFor="division" type="text" onChange={handleChange} value={form.division} />
                                        <InputForm errorMsg={errorMsg.position} title='Posisi' className='bg-slate-200' htmlFor="position" type="text" onChange={handleChange} value={form.position} />
                                    </div>

                                    <div className="flex gap-8 mb-2">
                                        <DatePicker showMonthAndYearPickers value={form.birthDate} label={"Tanggal Lahir"} variant={'underlined'} onChange={(e) => setForm({ ...form, birthDate: e })} />
                                        <DatePicker showMonthAndYearPickers value={form.joinDate} label={"Tanggal Bergabung"} variant={'underlined'} onChange={(e) => setForm({ ...form, joinDate: e })} />
                                    </div>

                                    <InputForm errorMsg={errorMsg.address} title='Alamat' className='bg-slate-200 ' htmlFor="address" type="text" onChange={handleChange} value={form.address} />





                                    <div className="flex justify-end my-2">
                                        <ButtonPrimary className='px-4 py-2 rounded-md flrx justify-center items-center' typeButon={'submit'}  >{loading ? <Spinner className={`w-5 h-5 mx-8`} size="sm" color="white" /> : 'Simpan'}  </ButtonPrimary>
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