import { axiosInterceptor } from "./axiosInterceptor"

export const coment = async (form: any, callback: any) => {
    await axiosInterceptor.post('/comment/', form)
        .then((result) => {
            callback(result.data)
            console.log(result.data);

        }).catch((err) => {
            console.log(err);

        });
}