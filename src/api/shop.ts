import { axiosInterceptor } from "./axiosInterceptor"

export const createProduct = async (form: any, callback: any) => {
    axiosInterceptor.post('/shop', form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}


export const updateShop = async (id: any, form: any, callback: any) => {
    await axiosInterceptor.put(`/shop/${id}`, form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}

export const deleteProduct = (id: string, callback: any) => {
    axiosInterceptor.delete(`/shop/${id}`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}