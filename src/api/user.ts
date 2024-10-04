import { axiosInterceptor } from "./axiosInterceptor"

export const getAllUser = (callback: any) => {
    axiosInterceptor.get('/user/list')
        .then((res) => {
            callback(res.data);
        })
        .catch((error) => {
            console.error("Error fetching all unit work:", error);
        });

}

export const deleteUser = async (id: any, callback: any) => {
    await axiosInterceptor.delete(`/user/delete/${id}`)
        .then((result) => {
            callback(true, result.data)
        }).catch((err: any) => {
            console.log(false, err);
        });
}