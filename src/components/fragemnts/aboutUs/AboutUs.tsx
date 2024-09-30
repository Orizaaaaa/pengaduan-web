'use client'

const AboutUs = () => {
    return (
        <div className="container mx-auto py-20">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-27">
                <div className="lg:col-span-1 flex flex-col justify-center items-center" data-aos="fade-up">
                    <div className="flex justify-center">
                        <hr className="border-3 rounded-md border-black my-5 w-22" />
                    </div>
                    <h1 className="text-xl lg:text-2xl font-medium">TENTANG</h1>
                </div>
                <div className="lg:col-span-5 px-2 lg:px-0" data-aos="fade-left">
                    <h1 className="text-xl my-2 lg:my-4 text-primary font-bold">TENTANG DESA GARUT</h1>
                    <h1 className="text-xl text-primary md:text-3xl font-semibold bg-gradient-to-r from-blue-500 to-black text-transparent bg-clip-text">
                        Desa Garut merupakan perpaduan budaya, alam, dan kehidupan masyarakat yang harmonis.
                    </h1>
                    <p className="text-slate-500 mt-2">
                        Kami bangga menjadi komunitas yang kaya akan tradisi dan keindahan alam, dengan komitmen untuk menjaga nilai-nilai lokal sambil berinovasi dan membangun masa depan yang berkelanjutan.
                    </p>
                </div>
            </div>
        </div>


    )
}

export default AboutUs