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
import { Skeleton, Spinner, useDisclosure } from '@nextui-org/react'
import dynamic from 'next/dynamic'
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { FaPen } from 'react-icons/fa6'
import useSWR, { mutate } from 'swr'

type Props = {}

const Page = (props: Props) => {
    const [loadingUi, setLoadingUi] = useState(true)
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
        if (dataArticle) {
            setForm({
                title: dataArticle.title,
                description: dataArticle.description,
                image: dataArticle.image,
            });
            editorContentRef.current = dataArticle.description;
        }
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
    const editorContentRef = useRef(form.description);
    const editorInstanceRef = useRef(null)

    // Modifikasi pada handleSave untuk menjamin pembaruan state selesai
    const handleSave = (): Promise<void> => {
        return new Promise((resolve) => {
            setForm((prevForm) => {
                // Pastikan form.description diperbarui dengan nilai terbaru dari editor
                return {
                    ...prevForm,
                    description: editorContentRef.current,
                };
            });
            resolve(); // Selesaikan promise setelah setForm dipanggil
        });
    };

    const handleChangeEditor = (newContent: string) => {
        editorContentRef.current = newContent;
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };


    // handle update article
    const handleUpdateArticle = async () => {
        await handleSave();
        console.log(form);

        setLoading(true)
        // Membaca form terbaru langsung setelah handleSave dijalankan
        const latestForm = {
            ...form,
            description: editorContentRef.current,
        };

        if (latestForm.image instanceof Blob) {
            const imageUrl = await postImage({ image: latestForm.image });

            if (imageUrl) {
                const data: any = { ...latestForm, image: imageUrl };
                updateArticle(id, data, (result: any) => {
                    console.log(result);
                    mutate(`${url}/news/${id}`);
                    setUpdateOpen(false);
                    setLoading(false);
                });
            }
        } else {
            await updateArticle(id, latestForm, (result: any) => {
                console.log(result);
                mutate(`${url}/news/${id}`);
                setUpdateOpen(false);
                setLoading(false);
            });
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
            router.push('/dashboard-super-admin/articles')
            setLoadingDelete(false)
        })
    }

    console.log(dataArticle);
    console.log(form);

    const isLoading = !data && !error

    return (
        <DefaultLayout>
            <div className=" button-action flex justify-end m-3 gap-3 ">
                <div className="flex bg-white justify-end gap-3 p-2 rounded-lg ">
                    <FaTrashAlt className='cursor-pointer' color='red' onClick={openModalDelete} />
                    <FaPen className='cursor-pointer' color='blue' onClick={buttonChangeUpdate} />
                </div>

            </div>

            {isLoading ? (
                <>
                    <Skeleton className="rounded-lg w-70">
                        <div className="h-36 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <div className="bg-white rounded-lg mt-4 space-y-4 p-3">
                        <Skeleton className="w-full rounded-lg">
                            <div className="h-3  w-full rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-full rounded-lg">
                            <div className="h-3  w-full rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-32.5 rounded-lg">
                            <div className="h-3  w-32.5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-full rounded-lg">
                            <div className="h-3  w-full rounded-lg bg-default-200"></div>
                        </Skeleton>
                    </div>
                </>
            ) : (
                updateOpen ? (
                    <>
                        <div className="w-full">
                            <div>
                                <div className="images">
                                    {form.image && form.image instanceof Blob ? (
                                        <img className="h-[170px] md:h-[300px] w-auto mx-auto rounded-md" src={URL.createObjectURL(form.image)} />
                                    ) : (
                                        <div className="images rounded-md h-[200px] bg-gray-300 p-2">
                                            <button className="flex-col justify-center items-center h-full w-full" type="button" onClick={() => handleFileManager('add')}>
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

                                    <div className="flex justify-center items-center gap-3 my-3">
                                        <button className={`border-2 border-primary text-primary px-4 py-2 rounded-md ${form.image === null ? 'hidden' : ''}`} type="button" onClick={() => handleFileManager('add')}>
                                            Ubah Gambar
                                        </button>
                                    </div>
                                </div>

                                <InputForm htmlFor="title" placeholder="Masukan judul artikel" type="text" onChange={handleChange} value={form.title} />
                                <JoditEditor
                                    ref={editorInstanceRef}
                                    value={editorContentRef.current}       // This is important
                                    config={config}         // Only use when you declare some custom configs
                                    onChange={(e) => handleChangeEditor(e)} // Handle the changes
                                    className="w-full h-[70%] text-black bg-white"
                                />
                                <style>
                                    {`.jodit-wysiwyg{min-height: 300px !important;}`}
                                </style>
                            </div>

                            <div className="flex justify-end w-full my-4">
                                <ButtonPrimary onClick={handleUpdateArticle} className="px-4 py-2 rounded-md flex justify-center items-center">
                                    {loading ? <Spinner className="w-5 h-5 mx-8" size="sm" color="white" /> : 'Perbarui Artikel'}
                                </ButtonPrimary>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <img className="h-60 rounded-md mb-3" src={dataArticle?.image} alt="" />
                        <div className="p-1 md:p-4 bg-white shadow-10 rounded-lg mb-10">
                            <h1 className="h1 text-lg font-medium my-3">{dataArticle?.title}</h1>
                            <div dangerouslySetInnerHTML={{ __html: dataArticle?.description }}></div>
                        </div>
                    </>
                )
            )}


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