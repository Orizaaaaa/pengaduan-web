/* Imports */
'use client'
import React, { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { useRouter } from 'next/navigation';
import InputForm from '@/components/elements/input/InputForm';
import { image, Spinner } from '@nextui-org/react';
import Image from 'next/image';
import { camera } from '@/app/image';
import { createArticle } from '@/api/article';
import ButtonPrimary from '@/components/elements/buttonPrimary';
import { postImage } from '@/api/imagePost';

/* Using dynamic import of Jodit component as it can't render in server side */
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const TextEditor = ({ desc }: any) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [form, setForm] = useState({
        title: '',
        description: desc,
        image: null as File | null,
    })



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

    console.log(form);


    // handle submit article
    const handleCreateArticle = async () => {
        setLoading(true);
        const imageUrl = await postImage({ image: form.image });
        if (imageUrl) {
            const formSubmit: any = {
                ...form,
                image: imageUrl
            }

            await createArticle(formSubmit, (result: any) => {
                console.log(result)
                if (result) {
                    router.push('/dashboard-super-admin/articles');
                    setLoading(false);
                }
            })

        } else {
            console.log('error');
        }


    };

    return (
        <>
            {/* Below is a basic html page and we use Tailwind css to style */}
            <main>
                <div className="h-screen flex items-center flex-col">
                    <div >
                        <div className="images ">

                            {form.image && form.image instanceof Blob ? (
                                <img className="h-[170px] md:h-[300px] w-auto mx-auto rounded-md" src={URL.createObjectURL(form.image)} />
                            ) : (
                                <div className="images border-dashed border-2 border-black rounded-md h-[200px] bg-gray-300">
                                    <button className="flex-col justify-center items-center h-full w-full " type="button" onClick={() => handleFileManager('add')} >
                                        <Image alt='image' className="w-20 h-20 mx-auto" src={camera} />
                                        <p>*Masukan gambar sebagai thumbail artikel</p>
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
                        <style>
                            {`.jodit-wysiwyg{height:300px !important}`}
                        </style>
                    </div>

                    <div className="flex justify-end w-full my-4">
                        <ButtonPrimary onClick={handleCreateArticle} className='px-4 py-2 rounded-md'>{loading ? <Spinner className={`w-5 h-5 mx-8`} size="sm" color="white" /> : 'Buat Artikel'} </ButtonPrimary>
                    </div>


                    <div className="my-10 h-full w-full">
                        Hasil
                        <div className='p-3 bg-white shadow-10 rounded-lg mb-10' dangerouslySetInnerHTML={{ __html: form.description }}></div>
                    </div>
                </div>

            </main>
        </>
    );
}

export default TextEditor;
