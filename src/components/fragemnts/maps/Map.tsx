'use client'; // Tambahkan ini di bagian atas file

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Pastikan untuk mengimpor CSS Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

type Props = {
    lat: number,
    lng: number,
    addres: string
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

const Map = ({ lat, lng, addres }: Props) => {
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
                    <p>{addres}</p>
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
