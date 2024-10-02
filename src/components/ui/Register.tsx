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
import { loginService } from '@/api/auth';
import { useRouter } from 'next/navigation';

type Props = {}

const Register = (props: Props) => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(true);
    const [errorLogin, setErrorLogin] = useState('');
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

        // Update the disabled state based on the form values
        setDisabled(!(updatedValues.email.includes('@gmail.com') || updatedValues.email.includes('@test.com')) || updatedValues.password === "");
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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        await loginService(form, (status: boolean, res: any) => {
            setLoading(false);
            if (status) {
                const tokenCookies = `token=${res.data.token}`;
                document.cookie = tokenCookies; // Set cookie
                // Akses localStorage hanya di sisi klien
                localStorage.setItem('name', res.data.username);
                localStorage.setItem('role', res.data.role);
                localStorage.setItem('token', res.data.token)
                router.push('/dashboard');
            } else {
                setErrorLogin('*Email atau password salah');
                console.log(res.data);
            }
        });
    };
    return (
        <div className="register">
            <div className="container mx-auto flex justify-center items-center w-[100vw] h-[100vh] ">
                <form className='p-6 bg-[#e9e9e9] rounded-lg  m-3 lg:m-0' onSubmit={handleLogin}>

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
                        <InputForm placeholder='Masukkan No HP' type='number' htmlFor={'number_phone'} value={form.number_phone} onChange={handleChange} />
                    </div>

                    <div className="relative">
                        <button onClick={togglePassword} type='button' className='icon-password h-full  bg-transparent flex absolute right-0 justify-center items-center pe-4'>
                            {showPassword ? <FaEyeSlash size={20} color='#636363' /> : <IoEye size={20} color='#636363' />}
                        </button>
                        <InputForm className='form-input-login' htmlFor="password" onChange={handleChange} type={typePassword} value={form.password} placeholder="Masukkan Kata Sandi" />
                    </div>
                    <p className='text-red my-3 text-sm'>{errorLogin}</p>
                    <ButtonPrimary typeButon={"submit"} disabled={disabled} className={`rounded-lg w-full mb-3 font-medium py-2`}>
                        {loading ? <Spinner className={`w-5 h-5`} size="sm" color="white" /> : 'Sign In'}
                    </ButtonPrimary>
                    <p className='text-sm'>Sudah punya akun ? <Link className='text-primary font-medium ' href={'/login'} > Masuk</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Register