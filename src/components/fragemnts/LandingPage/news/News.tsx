'use client'

import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import { formatNews } from '@/utils/helper'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa6'
import useSWR from 'swr'

type Props = {}

const News = (props: Props) => {
    const { data, error } = useSWR(`${url}/news/list`, fetcher, {
        keepPreviousData: true,
    });

    // Mengambil array artikel dari data API
    const dataArticle = data?.data || [];

    return (
        <section className='news my-12' id='news'>
            <div className="container mx-auto p-2 lg:p-0">

                {/* hero1 */}
                <div className="hero-1">
                    <div className="flex justify-between mb-5">
                        <h2 className=" text-xl md:text-2xl font-bold ">Artikel</h2>
                        <Link href={'/artikel'} className='text-primary'>Lihat semua artikel</Link>
                    </div>
                </div>

                {/* hero2 */}
                <div className="hero-2 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 lg:gap-10">
                        {dataArticle.length > 0 ? (
                            <>
                                {/* Artikel Utama */}
                                <div className="col-span-3 h-80">
                                    <img
                                        className='w-full h-full object-cover rounded-md'
                                        src={dataArticle[0]?.image || '/default-image.jpg'}
                                        alt={dataArticle[0]?.title || 'news'}
                                        width={400}
                                        height={400}
                                    />
                                </div>

                                <div className="desc col-span-2 flex flex-col justify-between h-full">
                                    <div className="flex flex-col">
                                        <h1 className='text-xl md:text-2xl font-medium'>{dataArticle[0]?.title}</h1>
                                        <p className='mt-4 text-sm md:text-base mb-3' dangerouslySetInnerHTML={{ __html: formatNews(dataArticle[0]?.description, 200) }} />
                                    </div>
                                    <ButtonPrimary className='rounded-md w-full font-semibold p-3'>
                                        <Link href={`/articles/${dataArticle[0]?._id}`}>
                                            Buka Berita
                                        </Link>
                                    </ButtonPrimary>
                                </div>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>

                {/* hero 3 bottom */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                    {dataArticle.slice(1, 4).map((article: any, index: number) => (
                        <div className='h-60' key={article._id}>
                            <img
                                className='w-full h-full rounded-md object-cover'
                                src={article.image || '/default-image.jpg'}
                                alt={article.title}
                                width={400}
                                height={400}
                            />
                            <div className='text-sm md:text-base' dangerouslySetInnerHTML={{ __html: article.title }} />

                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default News
