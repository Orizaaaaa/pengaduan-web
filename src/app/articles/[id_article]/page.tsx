'use client'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import Navbar from '@/components/fragemnts/navbar/Navbar'
import { useParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

type Props = {}

const Page = (props: Props) => {
    const { id_article }: any = useParams()
    const { data, error } = useSWR(`${url}/news/${id_article}`, fetcher, {
        keepPreviousData: true,
    });
    const dataArticle = data?.data
    console.log(data);

    return (
        <>
            <Navbar />
            <div className='p-10 mt-17 bg-white shadow-10 rounded-lg mb-10 ' dangerouslySetInnerHTML={{ __html: dataArticle?.description }}></div>
        </>

    )
}

export default Page