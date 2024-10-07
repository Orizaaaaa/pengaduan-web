'use client'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { useParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

type Props = {}

const page = (props: Props) => {
    const { id }: any = useParams()
    const { data, error } = useSWR(`${url}/news/${id}`, fetcher, {
        keepPreviousData: true,
    });
    const dataArticle = data?.data
    console.log(data);

    return (
        <DefaultLayout>
            <div className=" p-1 md:p-4  bg-white shadow-10 rounded-lg mb-10">
                <h1 className='h1 text-lg font-medium my-3' >{dataArticle?.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: dataArticle?.description }}></div>
            </div>

        </DefaultLayout>

    )
}

export default page