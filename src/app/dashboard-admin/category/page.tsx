'use client'
import { createCategory, deleteCategory, getCategories } from '@/api/category'
import { postImage } from '@/api/imagePost'
import { camera } from '@/app/image'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import Card from '@/components/elements/card/Card'
import InputReport from '@/components/elements/input/InputReport'
import ModalDefault from '@/components/fragemnts/modal/modal'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { IoCloseCircleOutline } from 'react-icons/io5'

type Props = {}

const page = (props: Props) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isWarningOpen, onOpen: onWarningOpen, onClose: onWarningClose } = useDisclosure();
    const [category, setCategory] = useState([]);

    // form data untuk create category
    const [formData, setFormData] = useState({
        name: '',
        image: null as File | null
    });

    //form data untuk delete category
    const [dataDelete, setDataDelete] = useState('')


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
            setFormData({ ...formData, image: selectedImage || null });
        } else {
            console.log('error');

        }
    };

    //get all category
    useEffect(() => {
        getCategories((result: any) => {
            setCategory(result.data)
        })
    }, []);



    const handlecreateCategory = async (e: any) => {
        e.preventDefault()
        setDataDelete('')
        const imageUrl = await postImage({ image: formData.image });
        if (imageUrl) {
            const data = { name: formData.name, image: imageUrl }
            await createCategory(data, (result: any) => {
                console.log(result);
                onClose()
                getCategories((result: any) => {
                    setCategory(result.data)
                })
                setFormData({
                    name: '',
                    image: null as File | null
                })
            })
        }

    }

    const handleChangeId = (value: string) => {
        setDataDelete(value)
    }

    const handleAddCategory = () => {
        onOpen();
    }
    const handleDeleteModal = () => {
        onWarningOpen();
    };

    const confirmDelete = () => {
        if (dataDelete) {
            deleteCategory(dataDelete, (result: any) => {
                console.log(result);
                getCategories((result: any) => {
                    setCategory(result.data);
                });
                setDataDelete('');
                onWarningClose();
            });
        }
    };

    return (
        <DefaultLayout>
            <Card  >
                <div className="grid ">
                    <div className="flex-col space-y-3 my-auto">
                        <h1 className=" text-lg font-semibold md:text-2xl md:font-bold font-inter" >Halaman Kategori </h1>
                        <p className="text-gray-500 text-sm md:text-base" >Ini adalah halaman kategori anda dapat menambah atau menghapus kategori</p>
                    </div>
                </div>
            </Card >

            <div className="listcategory my-4">
                <Card  >
                    <div className='flex flex-wrap justify-center mx-auto mt-5 gap-10 w-full'>
                        <div className="flex flex-col justify-center items-center">
                            <button onClick={handleAddCategory} className="w-[70px] h-[70px] bg-gray-400 rounded-full flex justify-center items-center" ><FaPlus /></button>
                            <p className="mt-1" >Tambah Kategori</p>
                        </div>

                        {category.map((category: any, index) => (
                            <div className="image flex-col justify-center items-center" key={index}>
                                <img onClick={() => handleChangeId(category?._id)}
                                    className={`w-[70px] h-[70px] mx-auto rounded-full object-cover   cursor-pointer 
                               ${dataDelete === category?._id ? 'border-2 border-primary' : ''}`}
                                    src={category.image} alt={'image kategori'} />

                                <button className={`flex mt-1  ${dataDelete === category._id ? 'block' : 'hidden'}`}
                                    onClick={handleDeleteModal} ><IoCloseCircleOutline size={20} color="red" /></button>
                                <p className="text-sm md:text-base mt-1 text-center">{category.name}</p>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* modal */}
                <ModalDefault isOpen={isOpen} onClose={onClose}>
                    <form onSubmit={handlecreateCategory}>
                        <InputReport htmlFor="name" title="Nama Kategori : " type="text" onChange={handleChange} value={formData.name} />

                        <h1 className=" font-medium" >Logo Kategori :  </h1>
                        <div className="images ">
                            {formData.image && formData.image instanceof Blob ? (
                                <img className="h-[170px] md:h-[300px] w-auto mx-auto rounded-md" src={URL.createObjectURL(formData.image)} />
                            ) : (
                                <div className="images border-dashed border-2 border-black rounded-md h-[200px] bg-gray-300">
                                    <button className="flex-col justify-center items-center h-full w-full " type="button" onClick={() => handleFileManager('add')} >
                                        <Image src={camera} alt='kategori' className="w-20 h-20 mx-auto" />
                                        <p>*Masukan logo dari kategori tersebut</p>
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
                        </div>
                        <ButtonPrimary typeButon="submit" className="w-full mt-5 rounded-md"  >Simpan</ButtonPrimary>
                    </form>
                </ModalDefault>


                {/* Warning Modal */}
                <ModalDefault isOpen={isWarningOpen} onClose={onWarningClose}>
                    <h2 className="text-lg font-semibold">Peringatan</h2>
                    <p> apakah Anda yakin ingin menghapus kategori ini?</p>
                    <div className="flex justify-end gap-4 mt-4">
                        <ButtonPrimary onClick={onWarningClose} className="bg-gray-300 py-2 px-4 text-black rounded-md">Batal</ButtonPrimary>
                        <ButtonPrimary onClick={confirmDelete} className="bg-red-500 py-2 px-4 text-white rounded-md">Hapus</ButtonPrimary>
                    </div>
                </ModalDefault>
            </div>
        </DefaultLayout>
    )
}

export default page