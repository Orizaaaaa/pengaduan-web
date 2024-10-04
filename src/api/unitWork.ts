import { axiosInterceptor } from "./axiosInterceptor"

export const getAllUnitWork = (callback: any) => {
    //kalo error tambah utl api aja
    axiosInterceptor.get('/unit-work/list')
        .then((res) => {
            callback(res.data);
        })
        .catch((error) => {
            console.error("Error fetching all unit work:", error);
        });
}

export const createUnitWork = async (formUnitWork: any, callback: any) => {
    await axiosInterceptor.post('/unit-work', formUnitWork)
        .then((result) => {
            callback(true, result.data)
        }).catch((err: any) => {
            console.log(false, err);
        });

}

export const deleteUnitWork = async (id: any, callback: any) => {
    await axiosInterceptor.delete(`/unit-work/${id}`)
        .then((result) => {
            callback(true, result.data)
        }).catch((err: any) => {
            console.log(false, err);
        });
}
