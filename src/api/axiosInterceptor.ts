import axios from 'axios';

export const axiosInterceptor = axios.create({
    baseURL: 'https://bedesacms.vercel.app',
    // timeout: 5000,
});

// Selalu menggunakan token terbaru
axiosInterceptor.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor untuk menangani error response
axiosInterceptor.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { message, success } = error.response?.data || {};

        // Cek apakah message mengandung pesan kadaluarsa
        if (message === "Your Url is expired please try again letter!" && success === false) {
            // Hapus token jika diperlukan
            localStorage.removeItem('token');
            // Arahkan ke halaman login menggunakan window.location.href
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);
