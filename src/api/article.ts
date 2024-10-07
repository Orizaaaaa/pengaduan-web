import axios from "axios";
import { axiosInterceptor } from "./axiosInterceptor";
import { url } from "./auth";

export const createArticle = async (form: any, callback: any) => {
    await axiosInterceptor.post('/news', form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}

export const getAllArticle = (callback: any) => {
    axios.get(`${url}/news/list`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}

export const updateArticle = (id: any, form: any, callback: any) => {
    axiosInterceptor.put(`/news/${id}`, form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}