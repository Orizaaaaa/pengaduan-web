import ButtonPrimary from '@/components/elements/buttonPrimary'
import MainArticle from '@/components/fragemnts/ArticleComponent/MainArticle'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    return (
        <DefaultLayout>
            <div className="flex justify-end">
                <Link href={'/dashboard-officer/articles/create'} className='px-4 py-2 rounded-lg mb-4 bg-primary text-white' >Tambah Artikel</Link >
            </div>
            <MainArticle />

        </DefaultLayout>
    )
}

export default Page