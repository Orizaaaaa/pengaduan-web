import axios from "axios"
import { url } from "./auth"
import { axiosInterceptor } from "./axiosInterceptor";

export const getCategories = (callback: any) => {
    axios.get(`${url}/category/list`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);

        });
}

export const deleteCategory = (id: any, callback: any) => {
    axiosInterceptor.delete(`/category/${id}`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}

export const createCategory = async (form: any, callback: any) => {
    await axiosInterceptor.post('/category', form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}