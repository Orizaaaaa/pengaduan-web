import TextEditor from '@/components/fragemnts/TextEditor/TextEditor'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    return (
        <DefaultLayout>
            <TextEditor />
        </DefaultLayout>
    )
}

export default Page