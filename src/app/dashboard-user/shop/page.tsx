'use client'
import { url } from '@/api/auth';
import { fetcher } from '@/api/fetcher';
import CardHover from '@/components/elements/card/CardHover';
import DefaultLayout from '@/components/layouts/DefaultLayout'
import React from 'react'
import useSWR from 'swr';

type Props = {}

const page = (props: Props) => {
    const { data, error } = useSWR(`${url}/shop/list`, fetcher, {
        keepPreviousData: true,
    });
    const dataShop = data?.data
    return (
        <DefaultLayout>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-7">

                <CardHover price={1000000} desc='A clean look for a young squad who have their sights set on the very top. Standing out
                 over those timeless home colours, a simple heat-applied cannon crest is the star of this Arsenal authentic jersey from adidas. 
                 Stay-cool HEAT.RDY and soft doubleknit fabric combine to keep Gunners players pushing for more on the football pitch. This product
                  is made with 100% recycled materials. By reusing materials that have already been created, we help to reduce waste and our
                   reliance on finite resources and reduce the footprint of the products we make.'
                    title='Arsenal Jersey' image='https://preview.thenewsmarket.com/Previews/ADID/StillAssets/800x600/662664.jpg' />

                {dataShop?.map((item: any, index: number) => (
                    <CardHover key={index} title={item.name} desc={item.description} image={item?.image[0]} price={item.price} />
                ))}
            </div>

        </DefaultLayout>
    )
}

export default page