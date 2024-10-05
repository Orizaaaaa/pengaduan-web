import React from 'react'
import Navbar from '../fragemnts/navbar/Navbar'
import Footer from '../fragemnts/LandingPage/footer/Footer'
import MainArticle from '../fragemnts/ArticleComponent/MainArticle'

type Props = {}

const Article = (props: Props) => {
    return (
        <>
            <Navbar />
            <section className='container mx-auto min-h-[80vh] mt-17'>
                <MainArticle />
            </section>
            <Footer />

        </>

    )
}

export default Article