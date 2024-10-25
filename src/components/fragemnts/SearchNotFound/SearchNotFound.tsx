import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import searchNotFound from '../../../assets/notFound.json'

type Props = {
    text: string
    height: string
    width: string
}

const SearchNotFound = ({ text, height, width }: Props) => {
    return (
        <div>
            <Player
                autoplay
                loop
                src={searchNotFound}
                style={{ height: height, width: width }}
            />
            <p className='text-slate-400 text-center' >{text}</p>
        </div>
    )
}

export default SearchNotFound