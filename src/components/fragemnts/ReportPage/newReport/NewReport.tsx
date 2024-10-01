import React from 'react'
import CardReport from '../../CardReport/CardReport'
import { human1 } from '@/app/image'

type Props = {}

const NewReport = (props: Props) => {
    return (
        <section className='container mx-auto my-20' >
            <div className="text-start text-2xl">
                <h1 className="text-primary font-medium" >Laporan</h1>
                <h1 className="text-primary font-bold" >Berikut Adalah Laporan Terbaru</h1>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  mt-12 gap-4">
                <CardReport title='Jalan Rusak' location='Bandung' address='Jl. Moch. Toha No. 77' desc='Jalan Rusak' status='Menunggu'
                    date='12.12.2022' image={human1} />
                <CardReport title='Jalan Rusak' location='Bandung' address='Jl. Moch. Toha No. 77' desc='Jalan Rusak' status='Menunggu'
                    date='12.12.2022' image={human1} />
                <CardReport title='Jalan Rusak' location='Bandung' address='Jl. Moch. Toha No. 77' desc='Jalan Rusak' status='Menunggu'
                    date='12.12.2022' image={human1} />
                <CardReport title='Jalan Rusak' location='Bandung' address='Jl. Moch. Toha No. 77' desc='Jalan Rusak' status='Menunggu'
                    date='12.12.2022' image={human1} />
            </section>
        </section>
    )
}

export default NewReport