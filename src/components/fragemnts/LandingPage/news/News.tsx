'use client'

import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import { formatNews } from '@/utils/helper'
import { Skeleton } from '@nextui-org/react'
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
    const isLoading = !data && !error
    return (
        <section className='news my-12' id='news'>
            <div className="container mx-auto p-2 lg:p-0">

                {/* hero1 */}
                <div className="hero-1">
                    <div className="flex justify-between mb-5">
                        <h2 className=" text-xl md:text-2xl font-bold ">Artikel</h2>
                        <Link href={'/articles'} className='text-primary'>Lihat semua artikel</Link>
                    </div>
                </div>

                {/* hero2 */}
                <div className="hero-2 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 lg:gap-10">
                        {isLoading ? (
                            <>
                                {/* Placeholder Artikel Utama */}
                                <div className="col-span-3 h-80">
                                    <Skeleton className="h-full w-full rounded-md">
                                        <div className="h-full w-full bg-gray-300"></div>
                                    </Skeleton>
                                </div>

                                {/* Placeholder Deskripsi */}
                                <div className="desc col-span-2 flex flex-col justify-between h-full">
                                    <Skeleton className="h-6 w-3/4 mb-4 rounded-md">
                                        <div className="h-6 bg-gray-300"></div>
                                    </Skeleton>
                                    <Skeleton className="h-4 w-full mb-2 rounded-md">
                                        <div className="h-4 bg-gray-300"></div>
                                    </Skeleton>
                                    <Skeleton className="h-4 w-full mb-2 rounded-md">
                                        <div className="h-4 bg-gray-300"></div>
                                    </Skeleton>
                                    <Skeleton className="h-4 w-1/2 mb-6 rounded-md">
                                        <div className="h-4 bg-gray-300"></div>
                                    </Skeleton>
                                    <Skeleton className="h-10 w-full rounded-md">
                                        <div className="h-10 bg-gray-300 rounded-md"></div>
                                    </Skeleton>
                                </div>
                            </>
                        ) : (
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
                        )}

                    </div>
                </div>

                {/* hero 3 bottom */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">

                    {isLoading ?
                        Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton className={`h-60 bg-gray-300 rounded-md`} key={index}>
                                <div className="w-full h-full object-cover rounded-md" ></div>
                            </Skeleton>
                        )) :
                        <>
                            {dataArticle.slice(1, 4).map((article: any, index: number) => (
                                <div className='h-60' key={index}>
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
                        </>}

                </div>

            </div>
        </section>
    )
}

export default News
