'use client'
import { camera } from '@/app/image'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import CaraoselImage from '@/components/fragemnts/caraoselProduct/caraoselProduct'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import Image from 'next/image'
import React from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { SwiperSlide } from 'swiper/react'

type Props = {}

const page = (props: Props) => {
    const [form, setForm] = React.useState({
        name: [] as File[],
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, InputSelect: string) => {
        if (InputSelect === 'add') {
            const selectedImage = e.target.files?.[0];
            if (selectedImage) {
                setForm(prevState => ({
                    ...prevState,
                    name: [...prevState.name, selectedImage]
                }));
            }
        } else {
            console.log('error');
        }
    };

    const deleteArrayImage = (index: number) => {
        setForm(prevState => ({
            ...prevState,
            name: prevState.name.filter((_, i) => i !== index)
        }));
    };

    console.log(form);

    return (
        <DefaultLayout>
            {/* caraosel */}
            <div>
                <CaraoselImage>
                    {form.name.length > 0 ? (
                        form.name.map((image, index) => (
                            <SwiperSlide key={index}>
                                <>
                                    <div className="flex justify-center items-center " style={{ pointerEvents: 'none' }}>
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`preview-${index}`}
                                            className="w-auto h-[350px] relative"
                                        />
                                    </div>
                                    <button onClick={() => deleteArrayImage(index)} className="button-delete array image absolute top-0 right-0 z-10 "  ><IoCloseCircleOutline color="red" size={34} /></button>
                                </>
                            </SwiperSlide>
                        ))
                    ) : (
                        <div className='flex justify-center'>
                            <Image className="w-auto h-[200px] relative " src={camera} alt="image"></Image>
                        </div>
                    )}
                </CaraoselImage>

                <div className="grid grid-cols-2 justify-between my-5 gap-2">
                    <ButtonPrimary className='rounded-md relative cursor-pointer py-2 px-1' >Tambah Image
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            id="image-input-add"
                            onChange={(e) => handleImageChange(e, 'add')}
                        />
                    </ButtonPrimary>
                    <ButtonSecondary className='rounded-md  py-2 px-1' onClick={() => setForm(prevForm => ({ ...prevForm, images: [] }))} >Hapus Semua</ButtonSecondary>
                </div>

            </div>

        </DefaultLayout>
    )
}

export default page