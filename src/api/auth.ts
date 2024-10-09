import axios from "axios";
import { axiosInterceptor } from "./axiosInterceptor";
export const url = process.env.NEXT_PUBLIC_BASE_API
export const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME
export const cloudApiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
export const cloudApiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET



export const loginService = async (form: any, callback: any) => {
    await axios.post(`${url}/user/login`, form)
        .then((res) => {
            callback(true, res.data);
        }).catch((err) => {
            callback(false, err)
        })
}

export const registerUser = async (formRegister: any, callback: any) => {
    await axiosInterceptor.post('/user/register', formRegister)
        .then((res) => {
            callback(true, res.data);
            console.log(res.data);

        }).catch((err) => {
            callback(false, err);
        });
};

