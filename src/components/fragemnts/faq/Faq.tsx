'use client'

import { Accordion, AccordionItem } from '@nextui-org/react'
import React from 'react'

const Faq = () => {
    // Array of objects containing FAQ data
    const faqData = [
        {
            id: 1,
            question: "Bagaimana cara mendaftar sebagai warga desa?",
            answer: "Untuk mendaftar sebagai warga desa, Anda dapat datang langsung ke kantor desa dengan membawa KTP dan KK, atau mendaftar secara online melalui form pendaftaran yang tersedia di website."
        },
        {
            id: 2,
            question: "Apa saja layanan yang disediakan di website desa?",
            answer: "Website desa menyediakan layanan seperti pendaftaran penduduk, pengajuan surat keterangan, informasi mengenai program desa, dan update kegiatan terbaru di desa."
        },
        {
            id: 3,
            question: "Bagaimana cara mengajukan surat keterangan online?",
            answer: "Anda dapat mengajukan surat keterangan dengan login ke akun Anda di website desa, kemudian pilih menu 'Pengajuan Surat' dan ikuti instruksi yang ada untuk mengisi data dan kebutuhan dokumen."
        },
        {
            id: 4,
            question: "Siapa yang bisa dihubungi jika saya butuh bantuan lebih lanjut?",
            answer: "Jika Anda membutuhkan bantuan lebih lanjut, Anda dapat menghubungi perangkat desa melalui kontak yang tersedia di halaman 'Kontak Kami' di website atau datang langsung ke kantor desa pada jam kerja."
        }
    ];

    return (
        <section className='container mx-auto mb-22'>
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
