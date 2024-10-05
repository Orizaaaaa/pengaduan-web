import MainArticle from '@/components/fragemnts/ArticleComponent/MainArticle'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <DefaultLayout>
            <MainArticle />
        </DefaultLayout>
    )
}

export default page