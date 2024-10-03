'use client'
import { useEffect, useState } from 'react';
import ButtonPrimary from '@/components/elements/buttonPrimary';

type Props = {}

const Header = (props: Props) => {
    const [waitingCount, setWaitingCount] = useState(0);
    const [processingCount, setProcessingCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);

    useEffect(() => {
        // Function to animate the count from 0 to the target number
        const animateCount = (setCount: React.Dispatch<React.SetStateAction<number>>, target: number) => {
            let start = 0;
            const duration = 2000; // 2 seconds
            const stepTime = Math.abs(Math.floor(duration / target));

            const timer = setInterval(() => {
                start += 1;
                setCount(start);

                if (start >= target) {
                    clearInterval(timer);
                }
            }, stepTime);
        };

        // Animating each count
        animateCount(setWaitingCount, 120);
        animateCount(setProcessingCount, 600);
        animateCount(setCompletedCount, 20);

    }, []);

    return (
        <section className='mb-30' id='header-report'>
            <div className='container mx-auto min-h-[90vh] grid items-center px-4 pt-5 md:px-20 overflow-x-hidden'>
                <div className="title">
                    <h1 className='text-4xl lg:text-6xl font-bold text-white'>
                        PENGADUAN <br /> MASYARAKAT
                    </h1>
                    <p className='mt-5 text-sm md:text-base text-white'>
                        Masyarakat dapat mengadukan permasalahan yang terjadi di Garut perihal keamanan, ketertiban umum, kesejahteraan
                        sosial, pemberdayaan masyarakat, pemerintahan, ekonomi, dan pembangunan.
                    </p>
                    <ButtonPrimary className='py-2 px-4 mt-10 rounded-full bg-primary'>
                        Buat Laporan
                    </ButtonPrimary>
                </div>
            </div>

            {/* Section untuk menempatkan teks "hallo" di tengah */}
            <section className='relative '>
                <div className='flex gap-10 px-4 md:px-0 md:gap-20 justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-primary shadow-xl w-[80%] min-h-[90px] py-2 rounded-xl'>
                    <div className="flex flex-col justify-center">
                        <p className='text-3xl font-semibold text-white'>{waitingCount} +</p>
                        <p className='text-secondary text-sm text-start'>Menunggu</p>
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className='text-3xl font-semibold text-white'>{processingCount} +</p>
                        <p className='text-secondary text-sm text-start'>Di Proses</p>
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className='text-3xl font-semibold text-white'>{completedCount} +</p>
                        <p className='text-secondary text-sm text-start'>Selesai</p>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Header;
