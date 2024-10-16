import { axiosInterceptor } from "./axiosInterceptor"

export const createBuilding = async (form: any, callback: any) => {
    await axiosInterceptor.post('/infrastucture', form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}

export const updateBuilding = (id: any, form: any, callback: any) => {
    axiosInterceptor.put(`/infrastucture/${id}`, form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}


export const deleteBuilding = (id: any, callback: any) => {
    axiosInterceptor.delete(`/infrastucture/${id}`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}