'use client'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import CardBuilding from '@/components/elements/card/CardBuilding'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { formatDate } from '@/utils/helper'
import React from 'react'
import useSWR from 'swr'

type Props = {}

const Page = (props: Props) => {
    const { data, error } = useSWR(`${url}/infrastucture/list`, fetcher, {
        keepPreviousData: true,
    });
    const dataPembanguan = data?.data
    console.log(dataPembanguan);


    return (
        <DefaultLayout>
            <div className="flex justify-end">
                <ButtonPrimary className='py-2 px-4 rounded-md' >Tambah Pembangunan</ButtonPrimary>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-7">
                {dataPembanguan?.map((item: any, index: number) => (
                    <CardBuilding key={index} title={item.name} imageUrl={item.image}
                        date={formatDate(item.date)} location={item.address}
                        link={`/dashboard-super-admin/building/${item._id}`} />
                ))}

            </div>

        </DefaultLayout>
    )
}

export default Page