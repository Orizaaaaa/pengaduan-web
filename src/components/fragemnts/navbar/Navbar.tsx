'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ButtonPrimary from '../../elements/buttonPrimary';
import { navigation } from '@/utils/dataObject';
import { usePathname, useRouter } from 'next/navigation';
import { logo, logo2 } from '@/app/image';
import Image from 'next/image';

type Props = {}

const Navbar = (props: Props) => {
    const router = useRouter()
    const [activeSection, setActiveSection] = useState('beranda');
    const [role, setRole] = useState<string | null>(null);
    const [navbarBg, setnavbarBg] = useState(false);
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Fungsi untuk mengubah status tampilan menu mobile
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    useEffect(() => {
        setRole(localStorage.getItem("role"));
    }, []);


    console.log('nav role', role);



    useEffect(() => {
        const changeBackground = () => {
            if (typeof window !== 'undefined') {
                // Jika scroll lebih dari 80, bg langsung ada
                if (window.scrollY >= 80) {
                    setnavbarBg(true);
                } else if (pathname !== '/' && pathname !== '/report' && pathname !== '/shop' && pathname !== '/pembangunan') {
                    // Navbar langsung muncul kecuali di halaman '/' dan '/report'
                    setnavbarBg(true);
                } else {
                    setnavbarBg(false);
                }
            }
        };

        // Cek kondisi saat halaman pertama kali dibuka
        changeBackground();

        // Event listener untuk perubahan scroll
        window.addEventListener('scroll', changeBackground);

        return () => {
            window.removeEventListener('scroll', changeBackground);
        };
    }, [pathname]); // pathname untuk memantau perubahan halaman
    // Tambahkan pathname ke dependency array untuk mendeteksi perubahan





    useEffect(() => {
        const handleScroll = () => {

            const sections = document.querySelectorAll('section');

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();

                if (rect.top <= 330 && rect.bottom >= 330) {
                    setActiveSection(section.id);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const routesLogin = (value: any) => {
        if (value === 'superadmin') {
            return 'dashboard-super-admin'
        } else if (value === 'admin') {
            return 'dashboard-officer'
        } else {
            return 'login'
        }
    }



    return (
        <nav id='navbar' className={`navbar-up fixed top-0 left-0 py-2.5 w-full z-999999 ${navbarBg ? 'navbarbgActive shadow-2xl' : ''}`}>
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <div className="flex justify-start">
                    <Image className="portfolio-icon w-70 h-12 md:h-10" src={logo2} alt="logo2" />
                </div>

                <div className="flex items-center justify-end lg:hidden">
                    <div className="hidden mt-2 mr-4 sm:inline-block">
                        <span />
                    </div>

                    <button
                        onClick={toggleMobileMenu}
                        className={`navbar-toggler lg:hidden border-0 ${mobileMenuOpen ? 'opened' : ''}`}
                        type="button"
                    >
                        <span>
                            <svg width="34" height="34" viewBox="0 0 100 100">
                                <path
                                    className="line line1"
                                    d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                                />
                                <path className="line line2" d="M 20,50 H 80" />
                                <path
                                    className="line line3"
                                    d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                                />
                            </svg>
                        </span>
                    </button>
                </div>

                <div
                    className={`flex-col col-span-2 lg:col-span-2 w-full px-2 lg:flex lg:w-auto lg:order-1 overflow-hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
                    id="mobile-menu-2"
                >
                    <ul className="flex flex-col mt-4 p-3 lg:p-0 text-black font-medium lg:flex-row lg:space-x-8 lg:mt-0 w-full rounded-lg gap-1 lg:gap-0">
                        {navigation.map((item, index) => (
                            <li key={index}>
                                <Link className={`link no-underline ${pathname === item.location ? 'active' : ''}`}
                                    href={item.location}>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <ButtonPrimary onClick={() => router.push(`/${routesLogin(role)}`)} className="items-center justify-center font-medium gap-2 px-4 py-1 rounded-md w-full lg:w-auto mt-3 lg:mt-0  ">
                                {!role ? 'Login' : 'Dashboard'}
                            </ButtonPrimary>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
