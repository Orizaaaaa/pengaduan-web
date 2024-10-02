'use client'
import React, { useEffect, useState } from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import Card from '../elements/card/Card'
import { parseCoordinate } from '@/utils/helper'
import { coordinateDashboard, statusDashboard } from '@/api/dashboard'

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
    return (
        <DefaultLayout>
            <Card>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex-col space-y-3 my-auto">
                        <h1 className=" text-lg font-semibold md:text-2xl md:font-bold font-inter" >Selamat datang di dashboard Admin !</h1>
                        <p className="text-gray-500 text-sm md:text-base" >Senang melihat Anda kembali. Mari kita mulai hari ini dengan mengelola pengaudan yang telah di ajukan oleh masyarakat</p>
                    </div>
                    <div className="flex justify-center">
                        <img src={''} alt="dashboard" />
                    </div>
                </div>
            </Card>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">



                {dataCard.map((item, index) => (
                    <>
                        {loading ? (
                            <Card>
                                <div role="status" className="max-w-sm animate-pulse flex-col justify-center items-center">
                                    <div className="h-4 bg-gray-300 rounded-md  max-w-[360px] mb-2.5"></div>
                                    <div className="h-7  w-7  bg-gray-300 rounded-md mb-4"></div>
                                </div>
                            </Card>
                        ) : (<Card key={index}>
                            <div className="flex-col">
                                <h1>{item.name}</h1>
                                <h1 className={`text-2xl font-semibold ${colorCard(item.name)}`}>{item.value}</h1>
                            </div>
                        </Card>)
                        }
                    </>
                ))}
            </div >

            {/* <MapsAdmin center={{ lat: -6.917464, lng: 107.619125 }} dataMarker={markers} /> */}




        </DefaultLayout>

    )
}

export default DashboardAdmin