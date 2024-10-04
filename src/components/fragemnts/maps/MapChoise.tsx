'use client'; // Tambahkan ini di bagian atas file

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Pastikan untuk mengimpor CSS Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

type Props = {
    markerPosition: { lat: number, lng: number },
    zoom: number
    text: string
    children?: React.ReactNode
    className?: string
}


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

const MapChoise = ({ markerPosition, zoom, text, children, className }: Props) => {


    return (
        <MapContainer className={`${className} z-30`} center={{ lat: -6.917464, lng: 107.619125 }} zoom={zoom} scrollWheelZoom={false} >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {children}
            <Marker position={markerPosition} >
                <Popup>
                    {text}
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default MapChoise