'use client'
import React from 'react'
import Map from '../maps/Map'

type Props = {}

const LocationVillage = (props: Props) => {
    return (
        <section className='container mx-auto my-22' id='lokasi'>
            <Map lat={-6.937998511449565} lng={107.60711431503297} />
        </section>
    )
}

export default LocationVillage