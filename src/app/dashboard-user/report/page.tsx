'use client'

import { getAllReport } from '@/api/report';
import CardReport from '@/components/fragemnts/CardReport/CardReport';
import SearchNotFound from '@/components/fragemnts/SearchNotFound/SearchNotFound';
import SekeletonReport from '@/components/fragemnts/sekeleton/SekeletonReport';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { HiOutlineFilter } from 'react-icons/hi';
import { IoSearch } from 'react-icons/io5';

type Props = {}

const AllReport = (props: Props) => {
    const [loading, setLoading] = useState(true)
    const [dataReport, setDataReport] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [searchData, setSearchData] = useState("");


    useEffect(() => {
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



    return (
        <DefaultLayout>
            <div className="w-full mt-4 relative ">
                <input onChange={handleSearch} className="w-full rounded-md bg-white outline-none py-2 ps-11" type="text" placeholder="ketik laporan..." name="" id="" />
                <IoSearch size={20} color="#7C7C7C" className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex justify-end">
                <Dropdown>
                    <DropdownTrigger>
                        <button className=' flex justify-center items-center gap-2 bg-white border-2 mt-3 py-1 px-3 rounded-lg border-primary  text-primary ' >
                            Status
                            <HiOutlineFilter />
                        </button>
                    </DropdownTrigger>
                    <DropdownMenu className="w-full" aria-label="Static Actions">
                        <DropdownItem key="Semua Status" onClick={() => handleStatusSelect("")}>Semua Status</DropdownItem>
                        <DropdownItem key="Menunggu" onClick={() => handleStatusSelect("Menunggu")}> Menunggu</DropdownItem>
                        <DropdownItem onClick={() => handleStatusSelect("Diproses")} key="Diproses">Di Proses</DropdownItem>
                        <DropdownItem onClick={() => handleStatusSelect("Selesai")} key="Selesai">Selesai</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-3">

                {loading ?
                    <>
                        <SekeletonReport />
                        <SekeletonReport />
                        <SekeletonReport />
                        <SekeletonReport />
                        <SekeletonReport />
                        <SekeletonReport />
                    </> :
                    <>
                        {filteredData.map((item: any, index: number) => (
                            <CardReport
                                location={`/dashboard-user/report/${item.id}`}
                                image={item.imageReport[0]}
                                title={item.title}
                                address={item.address}
                                status={item.status}
                                date={item.createdAt}
                                desc={item.description}
                                key={index}
                            />
                        ))}
                    </>}

            </div>

            {!loading && (!filteredData || filteredData.length === 0) && (
                <div className="w-full flex items-center justify-center">
                    <SearchNotFound text="Laporan tidak ditemukan" height="300px" width="300px" />
                </div>
            )}

        </DefaultLayout>
    )
}

export default AllReport