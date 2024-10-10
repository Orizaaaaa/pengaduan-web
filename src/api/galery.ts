import { axiosInterceptor } from "./axiosInterceptor";

export const createGalery = async (form: any, callback: any) => {
    await axiosInterceptor.post('/gallery', form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}

export const deleteGalery = async (id: any, callback: any) => {
    await axiosInterceptor.delete(`/gallery/${id}`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}