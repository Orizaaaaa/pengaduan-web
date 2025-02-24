'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import InputForm from '../elements/input/InputForm'
import { FaEyeSlash, FaPen } from 'react-icons/fa6';
import { bgLogin, camera, logo } from '@/app/image';
import ButtonPrimary from '../elements/buttonPrimary';
import { Spinner } from '@nextui-org/react';
import { IoEye } from 'react-icons/io5';
import Link from 'next/link';
import { loginService, registerUser } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { postImage } from '@/api/imagePost';
import { IoIosArrowBack } from 'react-icons/io';

type Props = {}

const Register = (props: Props) => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true); // Untuk konfirmasi password
    const [errorMsg, setErrorMsg] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '', // Tambahkan untuk konfirmasi password
        image: '',
        role: '',
        number_phone: '',
        nik: ''
    });
    const [typePassword, setTypePassword] = useState("password");
    const [typeConfirmPassword, setTypeConfirmPassword] = useState("password"); // Untuk konfirmasi password
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '', // Tambahkan untuk konfirmasi password
        image: null as File | null,
        role: 'user',
        number_phone: '',
        nik: ''
    });

    const togglePassword = () => {
        setShowPassword(!showPassword);
        setTypePassword(showPassword ? "text" : "password");
    };

    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
        setTypeConfirmPassword(showConfirmPassword ? "text" : "password");
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Khusus validasi untuk nomor telepon
        if (name === 'number_phone') {
            // Hapus semua karakter selain angka
            let numericValue = value.replace(/\D/g, '');

            // Jika nomor dimulai dengan '08', ubah menjadi '628'
            if (numericValue.startsWith('08')) {
                numericValue = '628' + numericValue.slice(2);
            }

            // Jika lebih dari 15 angka, berikan pesan error
            if (numericValue.length > 15) {
                setErrorMsg((prev) => ({
                    ...prev,
                    number_phone: '*Nomor tidak boleh lebih dari 15 angka',
                }));
                return; // Tidak update state jika lebih dari 15 digit
            } else {
                // Hapus pesan error jika panjang nomor valid
                setErrorMsg((prev) => ({
                    ...prev,
                    number_phone: '',
                }));
            }

            // Update state dengan hanya angka
            setForm({ ...form, [name]: numericValue });
            return; // Menghentikan eksekusi lebih lanjut karena 'number_phone' sudah di-handle
        }

        // Khusus untuk validasi NIK
        if (name === 'nik') {
            // Hapus semua karakter selain angka
            const numericValue = value.replace(/\D/g, '');

            if (numericValue.length > 16) {
                setErrorMsg((prev) => ({
                    ...prev,
                    nik: '*NIK tidak boleh lebih dari 16 digit',
                }));
                return; // Tidak update state jika lebih dari 16 digit
            } else {
                setErrorMsg((prev) => ({
                    ...prev,
                    nik: '',
                }));
            }

            // Update state dengan hanya angka
            setForm({ ...form, [name]: numericValue });
            return; // Menghentikan eksekusi lebih lanjut karena 'nik' sudah di-handle
        }

        // Update state untuk input lainnya
        setForm({ ...form, [name]: value });
    };


    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Reset error messages
        const newErrorMsg = { name: '', email: '', password: '', confirmPassword: '', image: '', role: '', number_phone: '', nik: '' };
        setErrorMsg(newErrorMsg);

        let valid = true;

        // Validasi nama
        const nameRegex = /^[A-Za-z\s\-\_\'\.\,\&\(\)]{1,100}$/;
        // Validasi email
        const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
        // Validasi password
        const passwordRegex = /^[A-Za-z0-9]+$/;
        // Validasi angka (untuk NIK dan No. HP)
        const numberRegex = /^[0-9]+$/;
        // Validasi nomor telepon yang dimulai dengan 628 dan minimal 10 digit
        const phoneRegex = /^628[0-9]{8,}$/;

        // Cek apakah semua field diisi
        if (!form.name) {
            newErrorMsg.name = '*Nama harus diisi';
            valid = false;
        }
        if (!form.email) {
            newErrorMsg.email = '*Email harus diisi';
            valid = false;
        }
        if (!form.password) {
            newErrorMsg.password = '*Password harus diisi';
            valid = false;
        }

        if (form.password !== form.confirmPassword) {
            newErrorMsg.confirmPassword = '*Password dan Konfirmasi Password tidak sama';
            valid = false;
        }

        if (!form.number_phone) {
            newErrorMsg.number_phone = '*No HP harus diisi';
            valid = false;

            // Menggunakan validasi baru untuk nomor telepon
        } else if (!phoneRegex.test(form.number_phone)) {
            newErrorMsg.number_phone = '*No HP harus dimulai dengan 628 dan berisi minimal 10 digit angka';
            valid = false;
        }

        if (!form.nik) {
            newErrorMsg.nik = '*NIK harus diisi';
            valid = false;
        }

        if (!form.image) {
            newErrorMsg.image = '*Foto profil harus diunggah';
            valid = false;
        }

        // Validasi tambahan
        if (form.nik && (!numberRegex.test(form.nik) || form.nik.length !== 16)) {
            newErrorMsg.nik = '*NIK harus berupa angka dan terdiri dari 16 karakter';
            valid = false;
        }

        if (form.number_phone && !numberRegex.test(form.number_phone)) {
            newErrorMsg.number_phone = '*Nomor telepon harus berupa angka';
            valid = false;
        }

        if (form.name && !nameRegex.test(form.name)) {
            newErrorMsg.name = '*Masukkan nama yang valid';
            valid = false;
        }

        if (form.email && !emailRegex.test(form.email)) {
            newErrorMsg.email = '*Masukkan email yang valid';
            valid = false;
        }

        if (form.password && (!passwordRegex.test(form.password) || form.password.length < 8)) {
            newErrorMsg.password = '*Password harus 8 karakter atau lebih';
            valid = false;
        }

        setErrorMsg(newErrorMsg);

        if (!valid) {
            setLoading(false);
            return;
        }

        // Jika lolos validasi
        const imageUrl = await postImage({ image: form.image });
        if (imageUrl) {
            const { confirmPassword, ...dataWithoutConfirmPassword } = form;
            const data = { ...dataWithoutConfirmPassword, image: imageUrl };
            registerUser(data, (status: boolean, res: any) => {
                if (res?.response?.data?.data?.error) {
                    setErrorMsg({
                        ...errorMsg, email: 'Email sudah terdaftar',
                    })
                }
                if (status) {
                    router.push('/login');
                }
                setLoading(false);
            });
        }
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





    console.log(form);

    return (
        <div className="register bg-primary">

            <div className="container mx-auto">
                <div className="flex items-center py-3 cursor-pointer " onClick={() => router.back()}>
                    <IoIosArrowBack size={20} color='white' />
                    <p className='text-white' >Kembali</p>
                </div>

            </div>
            <div className="container bg-primary mx-auto flex flex-col justify-center items-center w-[100vw] h-[99vh] ">
                <div className=" md:grid  md:grid-cols-2 gap-10">
                    <div className="h-90 w-full hidden md:block">
                        <Image src={bgLogin} alt="human" />
                    </div>
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


                        <InputForm errorMsg={errorMsg.name} placeholder='Masukkan Nama' type='text' htmlFor={'name'} value={form.name} onChange={handleChange} />
                        <InputForm errorMsg={errorMsg.nik} placeholder='Masukkan NIK' type='text' htmlFor={'nik'} value={form.nik} onChange={handleChange} />

                        <div className="flex gap-3">
                            <InputForm errorMsg={errorMsg.email} placeholder='Masukkan Email' type='email' htmlFor={'email'} value={form.email} onChange={handleChange} />
                            <InputForm errorMsg={errorMsg.number_phone} placeholder='Masukkan No HP' type='text' htmlFor={'number_phone'} value={form.number_phone} onChange={handleChange} />
                        </div>

                        <div className="relative">
                            <button onClick={togglePassword} type='button' className={`icon-password h-full bg-transparent flex absolute right-0 justify-center items-center pe-4 ${errorMsg.password ? 'pb-4' : ''}`}>
                                {showPassword ? <FaEyeSlash size={20} color='#636363' /> : <IoEye size={20} color='#636363' />}
                            </button>
                            <InputForm errorMsg={errorMsg.password} htmlFor="password" onChange={handleChange} type={typePassword} value={form.password} placeholder="Masukkan Kata Sandi" />
                        </div>

                        {/* Tambahan form untuk Konfirmasi Password */}
                        <div className="relative mt-1">
                            <button onClick={toggleConfirmPassword} type='button' className={`icon-password h-full bg-transparent flex absolute right-0 justify-center items-center pe-4 ${errorMsg.confirmPassword ? 'pb-4' : ''}`}>
                                {showConfirmPassword ? <FaEyeSlash size={20} color='#636363' /> : <IoEye size={20} color='#636363' />}
                            </button>
                            <InputForm errorMsg={errorMsg.confirmPassword} htmlFor="confirmPassword" onChange={handleChange} type={typeConfirmPassword} value={form.confirmPassword} placeholder="Konfirmasi Kata Sandi" />
                        </div>
                        <ButtonPrimary typeButon={"submit"} className={`rounded-lg w-full mb-3 font-medium py-2 flex justify-center items-center  bg-primary`}>
                            {loading ? <Spinner className={`w-5 h-5`} size="sm" color="white" /> : 'Daftar'}
                        </ButtonPrimary>
                        <p className='text-sm'>Sudah punya akun ? <Link className='text-primary font-medium ' href={'/login'} > Masuk</Link></p>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Register