import axios from 'axios';



export const axiosInterceptor = axios.create({
    baseURL: 'https://bedesacms.vercel.app',
    // timeout: 5000,
});

//selalu menggunakan token terbaru
axiosInterceptor.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
            config.headers['Authorization'] = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
