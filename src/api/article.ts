import { axiosInterceptor } from "./axiosInterceptor";

export const createArticle = async (form: any, callback: any) => {
    await axiosInterceptor.post('/category', form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}