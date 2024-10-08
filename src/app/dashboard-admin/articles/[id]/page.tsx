'use client'
import { deleteArticle, updateArticle } from '@/api/article'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import { postImage } from '@/api/imagePost'
import { camera } from '@/app/image'
import ButtonDelete from '@/components/elements/buttonDelete'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import InputForm from '@/components/elements/input/InputForm'
import ModalAlert from '@/components/fragemnts/modal/modalAlert'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { Spinner, useDisclosure } from '@nextui-org/react'
import dynamic from 'next/dynamic'
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { FaPen } from 'react-icons/fa6'
import useSWR, { mutate } from 'swr'

type Props = {}

const Page = (props: Props) => {

    const router = useRouter()

    // state
    const [form, setForm] = useState({
        title: '',
        description: '',
        image: null as File | null,
    })

    const [loading, setLoading] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const { id }: any = useParams()
    const [updateOpen, setUpdateOpen] = useState(false)
    const { data, error } = useSWR(`${url}/news/${id}`, fetcher, {
        keepPreviousData: true,
    });


    const dataArticle = data?.data
    useEffect(() => {
        setForm({
            title: dataArticle?.title,
            description: dataArticle?.description,
            image: dataArticle?.image
        })
    }, [dataArticle]);


    const buttonChangeUpdate = () => {
        setUpdateOpen(!updateOpen)
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

    /* The most important point */
    const config: any = useMemo(
        () => ({
            /* Custom image uploader button configuration to accept image and convert it to base64 format */
            uploader: {
                insertImageAsBase64URI: true,
                imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp'] // this line is not much important, use if you only strictly want to allow some specific image format
            },
        }),
        []
    );

    /* Function to handle the changes in the editor */
    const handleChangeEditor = (value: any) => {
        setForm({ ...form, description: value });
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };


    // handle update article
    const handleUpdateArticle = async () => {
        setLoading(true)
        if (form.image instanceof Blob) {
            const imageUrl = await postImage({ image: form.image });

            if (imageUrl) {
                const data: any = { ...form, image: imageUrl }
                updateArticle(id, data, (result: any) => {
                    console.log(result);
                    mutate(`${url}/news/${id}`)
                    setUpdateOpen(false)
                    setLoading(false)
                })
            }

        } else {
            await updateArticle(id, form, (result: any) => {
                console.log(result);
                mutate(`${url}/news/${id}`)
                setUpdateOpen(false)
                setLoading(false)
            })
        }


    };

    // delete article
    const { isOpen: isWarningOpen, onOpen: onWarningOpen, onClose: onWarningClose } = useDisclosure();
    const openModalDelete = () => {
        onWarningOpen()
    }

    const handleDelete = () => {
        setLoadingDelete(true)
        deleteArticle(id, (result: any) => {
            console.log(result);
            mutate(`${url}/news/${id}`)
            onWarningClose()
            router.push('/dashboard-admin/articles')
            setLoadingDelete(false)
        })
    }

    return (
        <DefaultLayout>
            <div className=" button-action flex justify-end m-3 gap-3 ">
                <div className="flex bg-white justify-end gap-3 p-2 rounded-lg ">
                    <FaTrashAlt className='cursor-pointer' color='red' onClick={openModalDelete} />
                    <FaPen className='cursor-pointer' color='blue' onClick={buttonChangeUpdate} />
                </div>

            </div>

            {updateOpen ?

                <>
                    <div className="w-full">
                        <div >
                            <div className="images ">

                                {form.image && form.image instanceof Blob ? (
                                    <img className="h-[170px] md:h-[300px] w-auto mx-auto rounded-md" src={URL.createObjectURL(form.image)} />
                                ) : (
                                    <div className="images  rounded-md h-[200px] bg-gray-300 p-2">
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
                            {/* This is the main initialization of the Jodit editor */}
                            <InputForm htmlFor="title" placeholder='Masukan judul artikel' type="text" onChange={handleChange} value={form.title} />
                            <JoditEditor
                                value={form.description}         // This is important
                                config={config}         // Only use when you declare some custom configs
                                onChange={handleChangeEditor} // Handle the changes
                                className="w-full h-[70%] text-black bg-white"
                            />
                        </div>

                        <div className="flex justify-end w-full my-4">
                            <ButtonPrimary onClick={handleUpdateArticle} className='px-4 py-2 rounded-md flex justify-center items-center'> {loading ? <Spinner className={`w-5 h-5 mx-8`} size="sm" color="white" /> : 'Perbarui Artikel'}  </ButtonPrimary>
                        </div>

                    </div>
                </>

                :
                <>
                    <div className=" p-1 md:p-4  bg-white shadow-10 rounded-lg mb-10">
                        <h1 className='h1 text-lg font-medium my-3' >{dataArticle?.title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: dataArticle?.description }}></div>
                    </div>

                </>}

            <ModalAlert isOpen={isWarningOpen} onClose={onWarningClose}>
                <h1>Apakah anda yakin ingin menghapus artikel ini yang berjudul <br /> <span className='font-medium' > " {dataArticle?.title} "</span> </h1>

                <div className="flex gap-3 justify-end">
                    <ButtonPrimary onClick={onWarningClose} className='px-4 py-2 rounded-md'>Batal</ButtonPrimary>
                    <ButtonDelete onClick={handleDelete} className='px-4 py-2 rounded-md flex justify-center items-center'>{loadingDelete ? <Spinner className={`w-5 h-5 mx-8`} size="sm" color="white" /> : 'Ya, Hapus'}</ButtonDelete>
                </div>
            </ModalAlert>

        </DefaultLayout>

    )
}

export default Page