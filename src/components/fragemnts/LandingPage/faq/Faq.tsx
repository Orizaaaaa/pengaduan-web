'use client'

import { Accordion, AccordionItem } from '@nextui-org/react'
import React from 'react'

const Faq = () => {
    // Array of objects containing FAQ data
    const faqData = [
        {
            id: 1,
            question: "Bagaimana cara mendaftar sebagai warga desa?",
            answer: "Untuk mendaftar sebagai warga desa, Anda cukup mendaftar secara online melalui form pendaftaran yang tersedia di website."
        },
        {
            id: 2,
            question: "Apa saja layanan yang disediakan di website desa?",
            answer: "Website desa menyediakan layanan seperti pengaduan, toko online untuk mendukung UMKM, informasi mengenai kegiatan desa, artikel terbaru mengenai kota garut, dan pembangunan kantor yang secara transaparan"
        },
        {
            id: 3,
            question: "Bagaimana cara mengajukan pengaduan online?",
            answer: "Anda dapat mengajukan pengaduan dengan cara pilih menu 'Pengaduan' dan ikuti instruksi yang ada untuk mengisi data dan kebutuhan dokumen."
        },
        {
            id: 4,
            question: "Siapa yang bisa dihubungi jika saya butuh bantuan lebih lanjut?",
            answer: "Jika Anda membutuhkan bantuan lebih lanjut, Anda dapat datang langsung ke kantor desa pada jam kerja."
        }
    ];

    return (
        <section className='container mx-auto my-22'>
            <h1 className='md:text-2xl font-bold text-center text-primary'>FAQ</h1>
            <Accordion>
                {faqData.map((item) => (
                    <AccordionItem
                        key={item.id}
                        aria-label={item.question}
                        title={item.question}>
                        {item.answer}
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    )
}

export default Faq
