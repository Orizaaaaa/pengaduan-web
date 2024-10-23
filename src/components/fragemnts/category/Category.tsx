'use client'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import { Popover, PopoverContent, PopoverTrigger, Skeleton } from '@nextui-org/react'
import useSWR from 'swr'

const Category = () => {
    const { data, error } = useSWR(`${url}/category/list`, fetcher, {
        keepPreviousData: true,
    });
    const dataCategory = data?.data
    console.log(dataCategory);

    const isLoading = !data && !error

    return (

        <section className='my-15 container mx-auto' id='category'>
            <div className="text-center text-2xl">
                <h1 className="text-primary font-medium" >Kategori</h1>
                <h1 className="text-primary font-bold" >Kategori pelaporan </h1>
            </div>

            <div className='grid my-15 grid-cols-3 md:grid-cols-4 lg:grid-cols-8 container mx-auto gap-5'>

                {isLoading ? (
                    Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className='flex flex-col justify-center items-center gap-2'>
                            <Skeleton className="flex rounded-full w-25 h-25 md:w-39 md:h-39" />
                            <Skeleton className="h-4 w-full rounded-lg" />
                        </div>
                    ))
                ) : (
                    dataCategory?.map((item: any, index: number) => (
                        <Popover placement="top" key={index}>
                            <PopoverTrigger>
                                <div className="image flex-col justify-center items-center relative cursor-pointer">
                                    <div className="relative w-25 h-25 md:w-39 md:h-39"> {/* Ukuran tetap untuk membuat gambar bulat */}
                                        <img
                                            src={item.image}
                                            className={`mx-auto rounded-full object-cover w-full h-full shadow-3`} // Hapus padding
                                            alt='image'
                                        />
                                        <div className="absolute inset-0 bg-black opacity-50 rounded-full"></div>
                                    </div>
                                </div>
                            </PopoverTrigger>

                            <PopoverContent>
                                <div className="px-1 py-2">
                                    <div className="text-small">{item.name}</div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    ))
                )}

            </div>




        </section>
    )
}

export default Category