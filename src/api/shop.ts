import { axiosInterceptor } from "./axiosInterceptor"

export const createProduct = async (form: any, callback: any) => {
    axiosInterceptor.post('/shop', form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}