"use client"; // Pastikan seluruh komponen ini dirender di sisi klien

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import InputForm from '@/components/elements/input/InputForm';
import ButtonPrimary from '@/components/elements/buttonPrimary';
import { FaEyeSlash } from 'react-icons/fa6';
import { IoEye } from 'react-icons/io5';
import { loginService } from '@/api/auth';
import { Spinner } from '@nextui-org/react';
import { logo } from '@/app/image';
import Link from 'next/link';

const Login = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(true);
    const [errorLogin, setErrorLogin] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [typePassword, setTypePassword] = useState("password");
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: ''
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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // nanti buat pengkondisian berdasarkan role
        await loginService(form, (status: boolean, res: any) => {
            setLoading(false);
            if (status) {
                setErrorLogin('');
                const tokenCookies = `token=${res.data.token}`;
                const roleCookies = `role=${res.data.role}`
                document.cookie = tokenCookies; // Set cookie
                document.cookie = roleCookies; // Set cookie
                // Akses localStorage hanya di sisi klien
                localStorage.setItem('name', res.data.name);
                localStorage.setItem('image', res.data.image);
                localStorage.setItem('role', res.data.role);
                localStorage.setItem('token', res.data.token)
                setLoading(false);

                if (res.data.role === 'superadmin') {
                    router.push('/dashboard-super-admin');
                } else if (res.data.role === 'user') {
                    router.push('/dashboard-user')
                } else if (res.data.role === 'admin') {
                    router.push('/dashboard-officer')
                }
            } else {
                setErrorLogin('*Email atau password salah');
                console.log(res.data);
            }

        });
    };


    return (
        <div className="login">
            <div className="container mx-auto flex justify-center items-center w-[100vw] h-[100vh] ">
                <form className='p-6 bg-[#e9e9e9] rounded-lg w-96 m-3 lg:m-0' onSubmit={handleLogin}>
                    <div className="logo flex justify-center my-5">
                        <Image src={logo} alt="logo" width={70} height={70} />
                    </div>

                    <InputForm placeholder='Masukkan Email' type='email' htmlFor={'email'} value={form.email} onChange={handleChange} />
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
                    <p className='text-sm'>Belum punya akun ? <Link className='text-primary font-medium ' href={'/register'} > Daftar</Link></p>
                    <div className="flex justify-end">
                        <Link className='text-primary text-small ' href={'/'} > Kembali ke beranda</Link>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;
