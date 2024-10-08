import { url } from "./auth";
import { axiosInterceptor } from "./axiosInterceptor";

export const getAllEmploye = (callback: any) => {
    axiosInterceptor(`/employee/list`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);

        });
}

export const getEmployeById = (id: string, callback: any) => {
    axiosInterceptor(`/employee/${id}`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}


export const updateEmploye = (id: any, form: any, callback: any) => {
    axiosInterceptor.put(`/employee/${id}`, form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}