'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import InputForm from '../elements/input/InputForm'
import { FaEyeSlash, FaPen } from 'react-icons/fa6';
import { camera, logo } from '@/app/image';
import ButtonPrimary from '../elements/buttonPrimary';
import { Spinner } from '@nextui-org/react';
import { IoEye } from 'react-icons/io5';
import Link from 'next/link';
import { loginService, registerUser } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { postImage } from '@/api/imagePost';

type Props = {}

const Register = (props: Props) => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [typePassword, setTypePassword] = useState("password");
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        image: null as File | null,
        role: 'user',
        number_phone: '',
        nik: ''
    });

    const togglePassword = () => {
        setShowPassword(!showPassword);
        setTypePassword(showPassword ? "text" : "password");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        const updatedValues = {
            ...form,
            [name]: value,
        };

        // Validasi nama
        const nameRegex = /^[A-Za-z\s\-\_\'\.\,\&\(\)]{1,100}$/;
        // Validasi email
        const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
        // Validasi password
        const passwordRegex = /^[A-Za-z0-9]+$/;
        // Validasi angka (untuk NIK dan No. HP)
        const numberRegex = /^[0-9]+$/;

        // Cek apakah semua field diisi
        if (
            !updatedValues.name ||
            !updatedValues.email ||
            !updatedValues.password ||
            !updatedValues.number_phone ||
            !updatedValues.nik || !updatedValues.image
        ) {
            setDisabled(true);
            setErrorMsg('*Semua field harus diisi');
            return;
        }

        // Validasi NIK harus berupa angka dan 16 karakter
        if (!numberRegex.test(updatedValues.nik) || updatedValues.nik.length !== 16) {
            setDisabled(true);
            setErrorMsg('*NIK harus berupa angka dan terdiri dari 16 karakter');
            return;
        }

        // Validasi No. HP harus berupa angka
        if (!numberRegex.test(updatedValues.number_phone)) {
            setDisabled(true);
            setErrorMsg('*Nomor telepon harus berupa angka');
            return;
        }

        // Validasi Nama
        if (!nameRegex.test(updatedValues.name)) {
            setDisabled(true);
            setErrorMsg('*Masukkan nama yang valid');
            return;
        }

        // Validasi Email
        if (!emailRegex.test(updatedValues.email)) {
            setDisabled(true);
            setErrorMsg('*Masukkan email yang valid');
            return;
        }

        // Validasi Password
        if (!passwordRegex.test(updatedValues.password) || updatedValues.password.length < 8) {
            setDisabled(true);
            setErrorMsg('*Password harus 8 karakter atau lebih');
            return;
        }

        // Jika semua validasi lolos, hapus pesan error dan enable tombol
        setErrorMsg('');
        setDisabled(false);
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
            setForm({ ...form, image: selectedImage || null });
        } else {
            console.log('error');

        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const imageUrl = await postImage({ image: form.image });
        if (imageUrl) {
            const data = { ...form, image: imageUrl };
            registerUser(data, (status: boolean, res: any) => {
                if (status) {
                    router.push('/login');
                    setLoading(false);
                }

                console.log(res);

            });
        }
    };

    console.log(form);

    return (
        <div className="register">
            <div className="container mx-auto flex justify-center items-center w-[100vw] h-[100vh] ">
                <form className='p-6 bg-[#e9e9e9] rounded-lg  m-3 lg:m-0' onSubmit={handleRegister}>

                    <div className="images my-3">
                        {form.image && form.image instanceof Blob ? (
                            <div className='relative h-[90px] w-[90px] mx-auto '>
                                <img className=" h-[90px] w-[90px]  rounded-full border-3 border-primary" src={URL.createObjectURL(form.image)} />
                                <div className=" absolute bottom-0 right-0 ">
                                    <button className={` bg-primary rounded-full p-2 ${form.image === null ? 'hidden' : ''}`} type="button" onClick={() => handleFileManager('add')}>
                                        <FaPen color='#ffff' />
                                    </button>
                                </div>
                            </div>

                        ) : (
                            <div className="images mx-auto border-dashed border-2 border-black rounded-full bg-gray-300 h-[80px] w-[80px] flex justify-center items-center relative">
                                <button className="flex-col justify-center items-center h-full w-full" type="button" onClick={() => handleFileManager('add')}>
                                    <Image className="w-10 h-10 mx-auto" src={camera} alt="cam" />
                                </button>
                            </div>
                        )}
                        <input
                            type="file"
                            className="hidden"
                            id="image-input-add"
                            onChange={(e) => handleImageChange(e, 'add')}
                        />

                    </div>


                    <InputForm placeholder='Masukkan Nama' type='text' htmlFor={'name'} value={form.name} onChange={handleChange} />
                    <InputForm placeholder='Masukkan NIK' type='text' htmlFor={'nik'} value={form.nik} onChange={handleChange} />

                    <div className="flex gap-3">
                        <InputForm placeholder='Masukkan Email' type='email' htmlFor={'email'} value={form.email} onChange={handleChange} />
                        <InputForm placeholder='Masukkan No HP' type='text' htmlFor={'number_phone'} value={form.number_phone} onChange={handleChange} />
                    </div>

                    <div className="relative">
                        <button onClick={togglePassword} type='button' className='icon-password h-full  bg-transparent flex absolute right-0 justify-center items-center pe-4'>
                            {showPassword ? <FaEyeSlash size={20} color='#636363' /> : <IoEye size={20} color='#636363' />}
                        </button>
                        <InputForm className='form-input-login' htmlFor="password" onChange={handleChange} type={typePassword} value={form.password} placeholder="Masukkan Kata Sandi" />
                    </div>
                    <p className='text-red my-3 text-sm'>{errorMsg}</p>
                    <ButtonPrimary typeButon={"submit"} disabled={disabled} className={`rounded-lg w-full mb-3 font-medium py-2 ${disabled ? 'bg-slate-400' : 'bg-primary'}`}>
                        {loading ? <Spinner className={`w-5 h-5`} size="sm" color="white" /> : 'Daftar'}
                    </ButtonPrimary>
                    <p className='text-sm'>Sudah punya akun ? <Link className='text-primary font-medium ' href={'/login'} > Masuk</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Register