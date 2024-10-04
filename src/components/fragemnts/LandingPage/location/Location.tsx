import React from 'react'
import Map from '../../maps/Map'

type Props = {}

const Location = (props: Props) => {
    return (
        <section className='container mx-auto my-22' id='lokasi'>
            <Map lat={-8.000000} lng={110.000000} />
        </section>
    )
}

export default Location