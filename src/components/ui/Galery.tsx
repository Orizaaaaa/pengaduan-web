'use client';
import React from 'react';
import Navbar from '../fragemnts/navbar/Navbar';
import Footer from '../fragemnts/LandingPage/footer/Footer';
import useSWR from 'swr';
import { fetcher } from '@/api/fetcher';
import { url } from '@/api/auth';
import { Skeleton } from '@nextui-org/react';

type Props = {}

const Galery = (props: Props) => {
    const { data, error } = useSWR(`${url}/gallery/list`, fetcher, {
        keepPreviousData: true,
    });
    const dataImage = data?.data;

    // Menggunakan loading state yang benar
    const isLoading = !data && !error

    return (
        <>
            <Navbar />
            <section className="image-list container mx-auto my-20 min-h-[50vh]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {isLoading ? (
                        Array.from({ length: 8 }).map((_, index) => (
                            <Skeleton key={index} className="rounded-lg">
                                <div className="h-50 w-full rounded-lg bg-default-300"></div>
                            </Skeleton>
                        ))

                    ) : (
                        dataImage?.map((item: any, index: any) => (
                            <React.Fragment key={index}>
                                {item.name.map((image: any, index: number) => (
                                    <div className="cover group relative" key={index}>
                                        <div className="relative h-50">
                                            <img
                                                src={image}
                                                alt={`preview-${image}`}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </React.Fragment>
                        ))
                    )}


                </div>
            </section>
            <Footer />
        </>
    );
}

export default Galery;
