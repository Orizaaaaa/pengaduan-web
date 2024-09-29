'use client'
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
    iconSize: [25, 41], // Sesuaikan ukuran ikon jika perlu
    iconAnchor: [12, 41], // Set titik anchor untuk lebih presisi
    popupAnchor: [1, -34], // Posisi popup relatif terhadap ikon
});

L.Marker.prototype.options.icon = DefaultIcon;

const Location = () => {
    // Set center agar sesuai dengan marker
    const center = { lat: -6.937998511449565, lng: 107.60711431503297 };

    return (
        <section className='container mx-auto my-22' id='lokasi'>
            <div className="text-2xl">
                <h1 className="text-primary font-medium">Lokasi</h1>
                <h2 className="text-primary font-bold">Lokasi Desa Kami Saat Ini</h2>
            </div>

            <MapContainer
                className={'h-[370px] rounded-md my-5 z-30'}
                center={center}
                zoom={13} // Sesuaikan zoom jika perlu
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={center}>
                    <Popup>
                        <p>{'PT INTI ( Gedung Utama ) lt 4, JL. Moch. Toha No.77, Cigelereng, Kec.Regol, Kota Bandung, Jawa Barat 40253'}</p>
                    </Popup>
                </Marker>
            </MapContainer>
        </section>
    );
};

export default Location;
