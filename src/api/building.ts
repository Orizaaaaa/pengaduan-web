import { axiosInterceptor } from "./axiosInterceptor"

export const updateBuilding = (id: any, form: any, callback: any) => {
    axiosInterceptor.put(`/infrastucture/${id}`, form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}