import { axiosInterceptor } from "./axiosInterceptor"

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