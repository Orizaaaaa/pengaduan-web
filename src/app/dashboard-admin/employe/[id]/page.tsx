'use client'
import { getEmployeById } from '@/api/employe'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {}

const page = (props: Props) => {
    const { id }: any = useParams()
    const [data, setData] = useState({})
    useEffect(() => {
        getEmployeById(id, (result: any) => {
            setData(result.data)
        })
    }, []);
    console.log(data);

    return (
        <div>page</div>
    )
}

export default page