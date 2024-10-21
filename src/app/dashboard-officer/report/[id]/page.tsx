'use client'

import { coment } from '@/api/coment';
import { changeStatusReport, deleteReport, getReportById } from '@/api/report';
import ButtonDelete from '@/components/elements/buttonDelete';
import ButtonPrimary from '@/components/elements/buttonPrimary';
import DropdownCustom from '@/components/elements/dropdown/Dropdown';
import MapChoise from '@/components/fragemnts/maps/MapChoise';
import ModalAlert from '@/components/fragemnts/modal/modalAlert';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { capitalizeWords, formatDate, parseCoordinate } from '@/utils/helper';
import { AutocompleteItem, Spinner, useDisclosure } from '@nextui-org/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface Report {
    address: string;
    category: {
        name: string;
    };
    comment: { name: string, message: string }[];
    createdAt: string;
    description: string;
    imageReport: string[];
    latitude: string;
    longitude: string;
    reporter: string;
    status: string;
    title: string;
    updatedAt: string;
    _id: string;
    unitWorks: any;
}


const Page = () => {
    const { isOpen: isWarningOpen, onOpen: onWarningOpen, onClose: onWarningClose } = useDisclosure();
    const router = useRouter()
    const { id }: any = useParams(); // Menggunakan id dari useParams
    const name = typeof window !== 'undefined' ? localStorage.getItem("name") : null; // Memastikan localStorage hanya diakses di client side
    const [dataReport, setDataReport] = useState<Report | null>(null);
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [statusFrom, setStatusForm] = useState('')
    const [formComent, setFormComent] = useState({
        id_report: id,
        message: ''
    });

    useEffect(() => {
        getReportById(id, (result: any) => {
            setDataReport(result.data);
            setStatusForm(result.data.status);
        });
    }, [id]);

    const dataDetailLaporan = [
        { title: "Judul Laporan", text: dataReport?.title },
        { title: "Nomor Laporan", text: dataReport?._id },
        { title: "Tanggal Laporan", text: formatDate(dataReport?.createdAt || "") },
        { title: "Kategori Laporan", text: dataReport?.category.name || "" },
        { title: "Lokasi Kejadian", text: dataReport?.address },
        { title: "Status", text: dataReport?.status },
        { title: "Deskripsi Laporan", text: dataReport?.description },
    ];

    const textRef = useRef<HTMLDivElement>(null);

    const handleChangeComent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormComent({ ...formComent, message: e.target.value });
    };

    const pushComent = async (e: React.FormEvent) => {
        e.preventDefault();
        await coment(formComent, (res: any) => {
            getReportById(id, (result: any) => {
                setDataReport(result.data);
                setTimeout(() => {
                    if (textRef.current) {
                        textRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 0);
            });
        });
        setFormComent({
            id_report: id,
            message: ''
        });
    };

    const onSelectionChange = (key: string) => {
        setStatusForm(key)  // Menyimpan nilai yang dipilih ke dalam state
    }

    const dataStatus = [
        { label: "Diproses", value: "Diproses" },
        { label: "Menunggu", value: "Menunggu" },
        { label: "Selesai", value: "Selesai" },
    ]




    const handleDeleteReport = () => {
        deleteReport(id, (res: any) => {
            router.push('/dashboard-officer/report')
            console.log(res);
        })
    }

    const openModalDelete = () => {
        onWarningOpen()
    }


    const handleChangeStatus = async () => {
        const dataStatus = {
            status: statusFrom
        }

        await changeStatusReport(id, dataStatus, (res: any) => {
            if (res) {
                getReportById(id, (result: any) => {
                    setDataReport(result.data);
                    setStatusForm(result.data.status);
                });
            }

        })
    }
    return (
        <DefaultLayout>
            <div className="bg-white p-3">
                <div className="grid grid-cols-1 lg:grid-cols-2 my-3 gap-8 lg:gap-0">
                    <div className="left space-y-6">
                        {dataDetailLaporan.map((item, index) => (
                            <div className="text" key={index}>
                                <h1 className="text-lg font-semibold">{item.title}</h1>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="right">
                        <img
                            className="h-[170px] md:h-[300px] rounded-md w-auto mx-auto"
                            src={dataReport?.imageReport[0]}
                            alt="Report Image"
                        />
                    </div>
                </div>

                <MapChoise
                    markerPosition={{
                        lat: parseCoordinate(dataReport?.latitude || "0"),
                        lng: parseCoordinate(dataReport?.longitude || "0"),
                    }}
                    zoom={10}
                    text="Lokasi kejadian"
                    className="h-[370px] rounded-md my-5"
                />

                <form className="coment" onSubmit={pushComent}>
                    <h1 className="text-primary font-semibold">Komentar ({dataReport?.comment.length})</h1>
                    <div className="display-comment bg-slate-300 w-full h-60 rounded-md p-3 overflow-y-auto">
                        {dataReport?.comment.length === 0 && (
                            <p className="text-gray-400">Belum ada komentar</p>
                        )}

                        {dataReport?.comment.map((item, index) => (
                            <div key={index}>
                                {item.name !== name ? (
                                    <div className="comment my-3 p-2 bg-slate-400 w-fit rounded-tl-2xl rounded-r-xl">
                                        <p className="text-white text-md">{capitalizeWords(item.name)}</p>
                                        <p className="text-white text-sm">{item.message}</p>
                                    </div>
                                ) : (
                                    <div ref={textRef} className="flex justify-end my-3">
                                        <div className="comment p-2 bg-primary w-fit rounded-tr-2xl rounded-l-xl">
                                            <p className="text-white text-md">{capitalizeWords(item.name)}</p>
                                            <p className="text-white text-sm">{item.message}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <h1 className="mt-4">Pesan : </h1>
                    <label htmlFor="message"></label>
                    <input
                        className="w-full h-9 rounded-md bg-slate-200 px-3 outline-none"
                        onChange={handleChangeComent}
                        type="text"
                        value={formComent.message}
                    />

                    <div className="flex justify-end">
                        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md mt-4">
                            Kirim pesan
                        </button>
                    </div>

                    <ButtonDelete onClick={openModalDelete} className=' px-4 py-2 rounded-md'>
                        Hapus Laporan
                    </ButtonDelete>

                    <div className="flex justify-end items-center gap-3 mt-3">
                        <div className="flex w-fit justify-center items-center gap-3">
                            <DropdownCustom defaultSelectedKey='' clearButton={false} defaultItems={dataStatus} onSelect={(e: any) => onSelectionChange(e)}>
                                {(item: any) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                            </DropdownCustom>

                        </div>
                        <ButtonPrimary className='px-4 py-2 rounded-md' onClick={handleChangeStatus}>Ubah Status</ButtonPrimary>
                    </div>


                </form>

                <ModalAlert isOpen={isWarningOpen} onClose={onWarningClose}>
                    apakah anda yakin ingin menghapus laporan ini
                    <div className="flex gap-3 justify-end">
                        <ButtonPrimary onClick={onWarningClose} className='px-4 py-2 rounded-md'>Batal</ButtonPrimary>
                        <ButtonDelete onClick={handleDeleteReport} className='px-4 py-2 rounded-md flex justify-center items-center'>{loadingDelete ? <Spinner className={`w-5 h-5 mx-8`} size="sm" color="white" /> : 'Ya, Hapus'}</ButtonDelete>
                    </div>
                </ModalAlert>
            </div>


        </DefaultLayout>
    );
};

export default Page;
