import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
    pathname: string,
    title: string,
    icon: any,
}

const NavigationList = ({ pathname, title, icon }: Props) => {
    const pathnames = usePathname();

    // Pisahkan URL menjadi array segmen berdasarkan "/"
    const currentPathSegments = pathnames.split('/').filter(Boolean);
    const targetPathSegments = pathname.split('/').filter(Boolean);

    // Cek apakah segmen kedua dari path saat ini cocok dengan path navigasi
    const isSegmentMatch =
        currentPathSegments.length > 1 &&
        targetPathSegments.length > 1 &&
        currentPathSegments[1] === targetPathSegments[1];

    // Cek apakah path saat ini sama persis dengan "/dashboard-super-admin"
    const isExactMatch = pathnames === pathname;

    // Jika pathnya "/dashboard-super-admin" aktif, atau segmen URL sesuai
    const isActive = isExactMatch || isSegmentMatch;

    return (
        <li>
            <Link
                href={pathname}
                className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark2 duration-300 text-gray-500 
                 ease-in-out hover:bg-primary hover:text-white ${isActive ? 'bg-primary text-white' : ''}`}
            >
                {icon}
                {title}
            </Link>
        </li>
    );
}

export default NavigationList;
