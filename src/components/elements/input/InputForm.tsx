type Props = {
    htmlFor: string
    title?: string
    type: string
    onChange: any
    value: number | string
    placeholder?: string,
    className?: string
    styleTitle?: string
    marginDiown?: string
}

function InputForm({ htmlFor, marginDiown = 'mb-2', title, type, onChange, value, placeholder, className, styleTitle }: Props) {
    return (
        <div className={marginDiown} >
            <label htmlFor={htmlFor} className={`${styleTitle}`}>
                {title}
            </label>
            <input
                className={`h-10 p-4  rounded-md outline-none w-full  ${className}`}
                type={type}
                name={htmlFor}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
            />
        </div>
    )
}

export default InputForm