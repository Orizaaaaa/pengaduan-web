import React from 'react'

type Props = {
    children?: React.ReactNode
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    className?: string
    typeButon?: any
    disabled?: boolean
}

const ButtonDelete = ({ children, onClick, className, disabled, typeButon = 'button' }: Props) => {
    return (
        <button type={typeButon} disabled={disabled} className={`bg-red  text-white  ${className}`} onClick={onClick}  >
            {children}
        </button >
    )
}

export default ButtonDelete