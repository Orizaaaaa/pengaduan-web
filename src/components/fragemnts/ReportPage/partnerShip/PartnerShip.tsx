import { brand1, brand10, brand2, brand3, brand4, brand5, brand6, brand7, brand8, brand9, logo } from '@/app/image'
import Image from 'next/image';
import React from 'react';

type Props = {};

const PartnerShip = (props: Props) => {

    const partner = [
        { image: brand3 },
        { image: brand2 },
        { image: brand4 },
        { image: brand5 },
        { image: brand6 },
        { image: brand9 },
        { image: brand10 },
    ];

    return (
        <section className="container mx-auto mb-20">
            <div className="text-start text-2xl">
                <h1 className="text-primary font-medium">Partner</h1>
                <h1 className="text-primary font-bold">Berikut Yang Kerja Sama Dengan Kami</h1>
            </div>

            <div className=" flex gap-5 mt-10 px-5 md:px-0">
                {partner.map((item, index) => (
                    <div className="flex justify-center items-center h-14" key={index}>
                        <Image
                            src={item.image}
                            alt={`Partner ${index + 1}`}
                            className="object-contain w-full h-full"
                            width={100}
                            height={100}
                        />
                    </div>
                ))}
            </div>

        </section>
    );
};

export default PartnerShip;
