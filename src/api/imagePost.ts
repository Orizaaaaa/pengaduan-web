import axios from "axios";
import { cloudName } from "./auth";


export const postImage = async ({ image }: { image: any }) => {
    const apiRequest = new FormData();
    apiRequest.append('file', image as File);  // Menggunakan 'file' sebagai parameter
    apiRequest.append('upload_preset', 'desa_cms');  // Ganti dengan upload preset Anda

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
            apiRequest
        );
        console.log(response.data.secure_url);
        return response.data.secure_url;

    } catch (error) {
        console.error('Error uploading the image', error);
    }
}

export const postImagesArray = async ({ images }: { images: any[] }) => {
    const urls = [];

    for (const image of images) {
        const apiRequest = new FormData();
        apiRequest.append('file', image as File);  // Menggunakan 'file' sebagai parameter
        apiRequest.append('upload_preset', 'desa_cms');  // Ganti dengan upload preset Anda

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
                apiRequest
            );
            console.log(response.data.secure_url);
            urls.push(response.data.secure_url);
        } catch (error) {
            console.error('Error uploading the image', error);
            urls.push(null);  // Menambahkan null jika terjadi error pada salah satu gambar
        }
    }

    return urls;
}

