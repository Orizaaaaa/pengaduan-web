import React from 'react'
import Navbar from '../fragemnts/navbar/Navbar'
import Header from '../fragemnts/ReportPage/Header/Header'
import AlurAduan from '../fragemnts/ReportPage/alurAduan/AlurAduan'
import Category from '../fragemnts/category/Category'
import NewReport from '../fragemnts/ReportPage/newReport/NewReport'
import Footer from '../fragemnts/LandingPage/footer/Footer'
import PartnerShip from '../fragemnts/ReportPage/partnerShip/PartnerShip'

type Props = {}

const Report = (props: Props) => {
    return (
        <>
            <Navbar />
            <section id='report' >
                <Header />
                <AlurAduan />
                <Category />
                <NewReport />
                <PartnerShip />
                <Footer />
            </section>
        </>

    )
}

export default Report