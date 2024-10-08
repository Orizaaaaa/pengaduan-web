import { axiosInterceptor } from "./axiosInterceptor";

export const createReport = async (formUnitWork: any, callback: any) => {
    await axiosInterceptor.post('/reports', formUnitWork)
        .then((result) => {
            callback(true, result.data)
        }).catch((err: any) => {
            console.log(false, err);
        });
}


export const getAllReport = (callback: any) => {
    //kalo error tambah utl api aja
    axiosInterceptor.get('/reports/list')
        .then((res) => {
            callback(res.data);
        })
        .catch((error) => {
            console.error("Error fetching all unit work:", error);
        });
}

export const getReportById = (id: string, callback: any) => {
    axiosInterceptor.get(`/reports/${id}`)
        .then((res) => {
            callback(res.data);
        })
        .catch((error) => {
            console.error("Error fetching get report by id", error);
        });
}
export const assignReport = async (formData: any, callback: any) => {
    await axiosInterceptor.post('/reports/assign', formData)
        .then((result) => {
            callback(true, result.data)
        }).catch((err: any) => {
            console.log(false, err);
        });
}


export const finishReportByOfficer = (formData: any, callback: any) => {
    axiosInterceptor.post('/reports/officer/done', formData)
        .then((result) => {
            callback(result.data)

        }).catch((err) => {
            console.log(err);
        });
}


export const deleteReport = async (id: any, callback: any) => {
    await axiosInterceptor.delete(`/reports/${id}`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}


export const changeStatusReport = async (id: any, form: any, callback: any) => {
    await axiosInterceptor.put(`/reports/${id}/status`, form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}