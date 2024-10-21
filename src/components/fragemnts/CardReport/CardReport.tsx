import { FaCalendar, FaLocationDot } from "react-icons/fa6"
import { formatCatrgory, formatDate, formatDateCapital, statusChange } from "../../../utils/helper"
import Link from "next/link"
import Image from "next/image"
import { CiCalendar, CiLocationOn } from "react-icons/ci"
import { MdOutlineTextSnippet } from "react-icons/md"


type Props = {
    location: string
    image: any
    title: string
    address: string
    status: string
    date: string
    desc: string
}

const CardReport = ({ location, image, title, address, status, date, desc }: Props) => {
    return (
        <Link href={location} className="rounded-lg hover: border-stroke transform transition-transform 
        duration-300 hover:scale-105 bg-white p-4  shadow-default 
        dark:border-strokedark h-full grid" >
            <div className="images h-[150px] w-full relative">
                <img className='rounded-lg w-full h-full' src={image} alt="image card report" />
            </div>
            <h1 className=' font-semibold text-lg mt-2  '>{title}</h1>
            <div className="flex justify-between items-center">
                <div className="my-1 flex items-center gap-1">
                    <CiCalendar color='#94A3B8' />
                    <p className='text-small text-slate-400 font-light' >{formatDateCapital(date)}</p>
                </div>
                <h1 className={`text-small  font-medium ${statusChange(status)}  uppercase`} >{status}</h1>
            </div>
            <div className="flex items-center gap-1 ">
                <CiLocationOn color='#94A3B8' />
                <p className='text-small text-slate-400 font-light'>{address}</p>
            </div>
            <div className="flex items-center gap-1 ">
                <MdOutlineTextSnippet color='#94A3B8' />
                <p className=' text-small text-slate-400 font-light' >{formatCatrgory(desc)}</p>
            </div>

        </Link>
    )
}

export default CardReport