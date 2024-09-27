import { AiOutlineFileDone } from "react-icons/ai"
import { BsPersonFillGear } from "react-icons/bs"
import { FaWhatsapp } from "react-icons/fa6"
import { GiGearHammer } from "react-icons/gi"
import { HiCursorArrowRays } from "react-icons/hi2"
import { IoIosPeople } from "react-icons/io"
import { IoLocationOutline } from "react-icons/io5"
import { MdOutlineMail } from "react-icons/md"

export const navigation = [
    {
        title: 'Beranda',
        location: 'home'
    },
    {
        title: 'Alur Aduan',
        location: 'news'
    },
    {
        title: 'Kategori',
        location: 'new-event'
    },
    {
        title: 'Laporan',
        location: 'galery'
    },
    {
        title: 'Lokasi',
        location: 'footer'
    },


]

export const informationData = [
    {
        icon: <IoLocationOutline />,
        text: 'Jl. Cipatat No. 12 Spanyol 16431'
    },
    {
        icon: <MdOutlineMail />,
        text: 'garut@gmail.com'
    },
    {
        icon: <FaWhatsapp />,
        text: '0895385744763'
    },
]
export const pages = [
    {
        text: 'Beranda'
    },
    {
        text: 'Alur Aduan'
    },
    {
        text: 'Kategori'
    },
    {
        text: 'Laporan'
    },
    {
        text: 'Lokasi'
    },
]

export const dataText = [
    {
        no: '#1',
        title: 'Registrasi Akun',
        subtitle: 'Mulailah perjalanan Anda dengan membuat akun di platform website Desa Garut. Cukup isi formulir pendaftaran untuk memulai.',
        icon: <IoIosPeople size={30} color="#024395" />
    },
    {
        no: '#2',
        title: 'Buat Laporan ',
        subtitle: 'Pilih dan buat laporan berdasarkan kategori yang sesuai',
        icon: <HiCursorArrowRays size={30} color="#024395" />
    },
    {
        no: '#3',
        title: 'Pengecekan Oleh Admin',
        subtitle: 'Laporan yang telah anda buat akan di tindak lanjuti oleh admin dan di selidiki sebelum di tugaskan ke pegawai. ',
        icon: <BsPersonFillGear size={26} color="#024395" />
    },
    {
        no: '#4',
        title: 'Pelaksanaan Pelaporan',
        subtitle: 'Kemudian admin akan menugaskan pelaksanaan pelaporan ke pegawai, sehingga pelaporan dapat ditindak lanjuti. dan pegawai akan selalu meng informasikan status kerjaan nya',
        icon: <GiGearHammer size={25} color="#024395" />
    },
    {
        no: '#5',
        title: 'Laporan Selesai',
        subtitle: 'Ketika laporan selesai maka akan menginformasikan status kerjaan laporan terhadap pelapor, dan bisa menilai dan berkomentar terkait kinerja perusahaan',
        icon: <AiOutlineFileDone size={25} color="#024395" />
    },
]