'use client'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import CardBuilding from '@/components/elements/card/CardBuilding'
import SekeletonReport from '@/components/fragemnts/sekeleton/SekeletonReport'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { formatDate, formatDateCapital } from '@/utils/helper'
import { useRouter } from 'next/navigation'

import React from 'react'
import useSWR from 'swr'

type Props = {}

const Page = (props: Props) => {
    const { data, error } = useSWR(`${url}/infrastucture/list`, fetcher, {
        keepPreviousData: true,
    });
    const dataPembanguan = data?.data
    console.log(dataPembanguan);
    const router = useRouter()
    const isLoading = !data && !error
    return (
        <DefaultLayout>
            <div className="flex justify-end">
                <ButtonPrimary onClick={() => router.push('/dashboard-super-admin/building/create')} className='py-2 px-4 rounded-md' >Tambah Pembangunan</ButtonPrimary>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-7">

                {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <SekeletonReport key={index} />
                    ))

                ) : (
                    dataPembanguan?.map((item: any, index: number) => (
                        <CardBuilding key={index} title={item.title} imageUrl={item.image}
                            date={formatDateCapital(item.date)} location={item.address}
                            link={`/dashboard-super-admin/building/${item._id}`} />
                    ))
                )}


            </div>

        </DefaultLayout>
    )
}

export default Page