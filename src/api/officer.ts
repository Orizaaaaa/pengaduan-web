import { axiosInterceptor } from "./axiosInterceptor";

export const getReportByUnitWork = (id: string, callback: any) => {
    axiosInterceptor.get(`/reports/unit-work/${id}`)
        .then((res) => {
            callback(true, res.data);
        }).catch((err) => {
            callback(false, err)
        })
}

export const getReportByIdOfficer = (id: string, callback: any) => {
    axiosInterceptor.get(`/reports/officer/${id}`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}