'use client'
import { bgPengaduan, human1 } from '@/app/image'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import CardHover from '@/components/elements/card/CardHover'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { formatNews } from '@/utils/helper'
import Image from 'next/image'
import React from 'react'
import { HiMapPin } from 'react-icons/hi2'
import { IoPersonSharp, IoStar } from 'react-icons/io5'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type Props = {}

const page = (props: Props) => {
    return (
        <DefaultLayout>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-7">
                <CardHover desc='A clean look for a young squad who have their sights set on the very top. Standing out
                 over those timeless home colours, a simple heat-applied cannon crest is the star of this Arsenal authentic jersey from adidas. 
                 Stay-cool HEAT.RDY and soft doubleknit fabric combine to keep Gunners players pushing for more on the football pitch. This product
                  is made with 100% recycled materials. By reusing materials that have already been created, we help to reduce waste and our
                   reliance on finite resources and reduce the footprint of the products we make.'
                    title='Arsenal Jersey' image='https://preview.thenewsmarket.com/Previews/ADID/StillAssets/800x600/662664.jpg' />

            </div>

        </DefaultLayout>
    )
}

export default page