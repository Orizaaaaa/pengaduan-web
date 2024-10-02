import Link from 'next/link'
import React from 'react'


type Props = {
    title?: string,
    href: string,
    children: React.ReactNode
}

const CardLink = ({ children, href }: Props) => {
    return (
        <Link href={href} className="rounded-md hover: border-stroke transform transition-transform 
        duration-300 hover:scale-105 bg-white  shadow-default 
        dark:border-strokedark ">
            {children}
        </Link>
    )
}

export default CardLink