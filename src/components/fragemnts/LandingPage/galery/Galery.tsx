import { url } from '@/api/auth';
import { fetcher } from '@/api/fetcher';
import { Skeleton } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';

type Props = {}

const Galery = (props: Props) => {
    const { data, error } = useSWR(`${url}/gallery/list`, fetcher, {
        keepPreviousData: true,
    });

    // Mengambil data array terakhir dari data API
    const lastItem = data?.data?.[data?.data?.length - 1];

    // Mengambil array gambar dari data terakhir
    const images = lastItem?.name || [];
    const isLoading = !data && !error;
    return (
        <section className='container mx-auto py-10'>
            <div className="flex justify-between mb-5">
                <h2 className=" text-xl md:text-2xl font-bold "> Galeri</h2>
                <Link href={'/galery'} className='text-primary' >Lihat semua galeri</Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton className={`h-80 bg-gray-300 ${index === 2 || index === 3 ? 'md:col-span-2' : ''} rounded-lg`} key={index}>
                            <div className="w-full h-full object-cover rounded-md" ></div>
                        </Skeleton>
                    ))
                ) : (
                    <>
                        {images.length > 0 && images.map((imgSrc: string, index: number) => (
                            <div key={index} className={`h-80 bg-gray-300 ${index === 2 || index === 3 ? 'md:col-span-2' : ''}`}>
                                <img src={imgSrc} alt={`Gallery Image ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                            </div>
                        ))}
                    </>
                )}


            </div>
        </section>
    );
}

export default Galery;
