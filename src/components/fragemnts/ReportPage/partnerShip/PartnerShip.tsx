import { basarnas, dinsos, dishub, kejaksaan, pertanian, polisi, pupr } from '@/app/image';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

type Props = {};

const PartnerShip = (props: Props) => {
    const partner = [
        {
            image: dishub,
            text: 'Dinas Perhubungan'
        },
        {
            image: kejaksaan,
            text: 'Kejaksaan'
        },
        {
            image: pertanian,
            text: 'Dinas Pertanian'
        },
        {
            image: polisi,
            text: 'Kepolisian'
        },
        {
            image: pupr,
            text: 'PUPR'
        },
        {
            image: basarnas,
            text: 'Basarnas'
        },
        {
            image: dinsos,
            text: 'Dinas Sosial'
        },
    ];

    return (
        <section className="container mx-auto mb-20">
            <div className="text-start text-2xl mb-10">
                <h1 className="text-primary font-medium">Partner</h1>
                <h1 className="text-primary font-bold">Berikut Yang Kerja Sama Dengan Kami</h1>
            </div>

            <div className='grid my-15 grid-cols-3 md:grid-cols-4 lg:grid-cols-7 container mx-auto gap-5'>
                {partner.map((item: any, index) => (

                    <Popover placement="top" key={index}>
                        <PopoverTrigger>
                            <div className="image flex-col justify-center items-center relative cursor-pointer" >
                                <Image
                                    width={140}
                                    height={140}
                                    src={item.image}
                                    className={`mx-auto rounded-full object-cover cursor-pointer w-full h-full shadow-3 p-4`}
                                    alt='image'
                                />


                            </div>
                        </PopoverTrigger>

                        <PopoverContent>
                            <div className="px-1 py-2">
                                <div className="text-small ">{item.text}</div>
                            </div>
                        </PopoverContent>
                    </Popover>



                ))}
            </div>
        </section>
    );
};

export default PartnerShip;
