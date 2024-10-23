'use client'
import React, { useEffect, useState } from 'react'
import CardReport from '../../CardReport/CardReport'
import { getAllReport } from '@/api/report'
import { Skeleton } from '@nextui-org/react'
import SekeletonReport from '../../sekeleton/SekeletonReport'

type Props = {}

const NewReport = (props: Props) => {
    const [loading, setLoading] = useState(true)
    const [dataReport, setDataReport] = useState([]);
    useEffect(() => {
        getAllReport((result: any) => {
            setDataReport(result.data);
            setLoading(false)
        });

    }, []);

    console.log(dataReport);

    return (
        <section className='container mx-auto my-20' >
            <div className="text-start text-2xl">
                <h1 className="text-primary font-medium" >Laporan</h1>
                <h1 className="text-primary font-bold" >Berikut Adalah Laporan Terbaru</h1>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mt-12 gap-4">

                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <SekeletonReport key={index} />
                    ))
                ) : (
                    dataReport.map((item: any, index: number) => (
                        <CardReport
                            location={`/dashboard-user/report/${item.id}`}
                            image={item.imageReport[0]}
                            title={item.title}
                            address={item.address}
                            status={item.status}
                            date={item.createdAt}
                            desc={item.description}
                            key={index}
                        />
                    ))
                )}

            </section>
        </section>
    )
}

export default NewReport