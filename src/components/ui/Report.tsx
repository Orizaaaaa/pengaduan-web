import React from 'react'
import Navbar from '../fragemnts/navbar/Navbar'
import Header from '../fragemnts/ReportPage/Header/Header'
import AlurAduan from '../fragemnts/ReportPage/alurAduan/AlurAduan'
import Category from '../fragemnts/category/Category'
import NewReport from '../fragemnts/ReportPage/newReport/NewReport'

type Props = {}

const Report = (props: Props) => {
    return (

        <section id='Report' >
            <Navbar />
            <Header />
            <AlurAduan />
            <Category />
            <NewReport />
        </section>
    )
}

export default Report