'use client';

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css'; // Pastikan untuk mengimpor CSS Leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

type Props = {
    lat: number,
    lng: number
};

// Atur ikon default untuk marker
let DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
    iconSize: [25, 41], // Sesuaikan ukuran ikon jika perlu
    iconAnchor: [12, 41], // Set titik anchor untuk lebih presisi
    popupAnchor: [1, -34], // Posisi popup relatif terhadap ikon
});

// Atur ikon marker default
L.Marker.prototype.options.icon = DefaultIcon;

// Gunakan dynamic import untuk MapContainer agar SSR dinonaktifkan
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });

const Map = ({ lat, lng }: Props) => {
    const center = { lat: lat, lng: lng };
    return (
        <MapContainer
            className={'h-[300px] rounded-md'}
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
    )
}

export default Map;
