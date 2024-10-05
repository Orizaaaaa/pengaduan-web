'use client'

import { getAllReport } from '@/api/report';
import CardReport from '@/components/fragemnts/CardReport/CardReport';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'

type Props = {}

const page = (props: Props) => {
    const [loading, setLoading] = useState(false)
    const [dataReport, setDataReport] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [searchData, setSearchData] = useState("");


    useEffect(() => {
        setLoading(true)
        getAllReport((result: any) => {
            setDataReport(result.data);
            setLoading(false)
        });

    }, []);


    const handleStatusSelect = (status: any) => {
        setSelectedStatus(status);
    };

    useEffect(() => {
        getAllReport((result: any) => {
            setDataReport(result.data)
        })
    }, []);

    const handleSearch = (e: any) => {
        setSearchData(e.target.value);
    };

    const filteredData = dataReport.filter((item: any) => {
        return (
            item.title && item.title.toLowerCase().includes(searchData.toLowerCase()) &&
            (selectedStatus === "" || item.status === selectedStatus)
        );
    });

    console.log(dataReport);


    return (
        <DefaultLayout>
            {/* <div className="w-full mt-4 relative ">
                <input onChange={handleSearch} className="w-full rounded-md bg-white outline-none py-2 ps-11" type="text" placeholder="ketik laporan..." name="" id="" />
                <IoSearch size={20} color="#7C7C7C" className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div> */}

            <div className="flex justify-end">
                <Dropdown>
                    <DropdownTrigger>
                        <Button className=" mt-4"
                            variant="bordered"
                        >
                            Status
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu className="w-full" aria-label="Static Actions">
                        <DropdownItem key="Semua Status" onClick={() => handleStatusSelect("")}>Semua Status</DropdownItem>
                        <DropdownItem key="Menunggu" onClick={() => handleStatusSelect("Menunggu")}> Menunggu</DropdownItem>
                        <DropdownItem onClick={() => handleStatusSelect("Diproses")} key="Diproses">Di Proses</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-3">

                {filteredData.map((item: any, index: number) => (
                    <CardReport
                        location={`/${item.id}`}
                        image={item.imageReport[0]}
                        title={item.title}
                        address={item.address}
                        status={item.status}
                        date={item.createdAt}
                        desc={item.description}
                        key={index}
                    />
                ))}


            </div>

        </DefaultLayout>
    )
}

export default page