'use client'
import React, { useEffect, useState } from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import Card from '../elements/card/Card'
import { parseCoordinate } from '@/utils/helper'
import { coordinateDashboard, statusDashboard } from '@/api/dashboard'
import Image from 'next/image'
import { manusiaLaptop } from '@/app/image'
import dynamic from 'next/dynamic'
import { Skeleton } from '@nextui-org/react'
const MapsAdmin = dynamic(() => import('../fragemnts/maps/MapsAdmin'), {
    ssr: false
});


interface Report {
    Menunggu: number
    Diproses: number
    Selesai: number
}

const DashboardAdmin = () => {
    const [dataDashboard, setDataDashboard] = useState({} as Report);
    const [loading, setLoading] = useState(false)
    const [dataCoordinate, setDataCoordinate] = useState([]);
    useEffect(() => {
        setLoading(true)
        statusDashboard((result: any) => {
            setDataDashboard(result.data)
            setLoading(false)
        })
        coordinateDashboard((result: any) => {
            setDataCoordinate(result.data)
        })
    }, []);


    //card
    const dataCard = [

        {
            name: 'Menunggu',
            value: dataDashboard.Menunggu
        },
        {
            name: 'Di Proses',
            value: dataDashboard.Diproses
        },
        {
            name: 'Selesai',
            value: dataDashboard.Selesai
        },

    ]

    const colorCard = (value: string) => {
        if (value === 'Di Proses') {
            return ('text-[#FF7F0A]')
        } else if (value === 'Menunggu') {
            return ('text-primary')
        } else if (value === 'Selesai') {
            return ('text-lime-700')
        }

    }

    //marker error
    const markers = dataCoordinate.map((item: any) => {
        return {
            lat: parseCoordinate(item.latitude),
            lng: parseCoordinate(item.longitude),
            popupText: item.title
        }

    })

    console.log(markers)

    return (
        <DefaultLayout>
            <Card>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex-col space-y-3 my-auto">
                        <h1 className=" text-lg font-semibold md:text-2xl md:font-bold font-inter" >Selamat datang di dashboard Admin !</h1>
                        <p className="text-gray-500 text-sm md:text-base" >Senang melihat Anda kembali. Mari kita mulai hari ini dengan mengelola pengaudan yang telah di ajukan oleh masyarakat</p>
                    </div>
                    <div className="flex justify-center">
                        <Image src={manusiaLaptop} alt="dashboard" />
                    </div>
                </div>
            </Card>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">



                {dataCard.map((item, index) => (
                    <React.Fragment key={index}>
                        {loading ? (
                            <Card>
                                <div className="max-w-[300px] w-full flex items-center gap-3">
                                    <div>
                                        <Skeleton className="flex rounded-md w-12 h-12" />
                                    </div>
                                    <div className="w-full flex flex-col gap-2">
                                        <Skeleton className="h-3 w-3/5 rounded-lg" />
                                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                                    </div>
                                </div>

                            </Card>
                        ) : (
                            <Card>
                                <div className="flex-col">
                                    <h1>{item.name}</h1>
                                    <h1 className={`text-2xl font-semibold ${colorCard(item.name)}`}>{item.value}</h1>
                                </div>
                            </Card>)
                        }
                    </React.Fragment>
                ))}
            </div >
            {loading ?
                <Skeleton className="rounded-lg mt-10">
                    <div className="h-45 rounded-lg bg-default-300"></div>
                </Skeleton>
                :
                <MapsAdmin center={{ lat: -6.917464, lng: 107.619125 }} dataMarker={markers} />}





        </DefaultLayout>

    )
}

export default DashboardAdmin