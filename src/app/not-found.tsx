'use client'
import { Player } from '@lottiefiles/react-lottie-player'
import notFoundAnimation from '../assets/404.json'

export default function NotFound() {
    return (
        <section id='error'>
            <div className=' min-h-[100vh] container mx-auto flex justify-center items-center overflow-x-hidden'>
                <div >
                    <Player
                        autoplay
                        loop
                        src={notFoundAnimation}
                        style={{ height: '400px', width: '400px' }}
                    />
                </div>
            </div>
        </section>
    )
}