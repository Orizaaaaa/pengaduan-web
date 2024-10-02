import axios from "axios";
import { url } from "./auth";

export const statusDashboard = (callback: any) => {
    axios.get(`${url}/dashboard/summary`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}

export const coordinateDashboard = (callback: any) => {
    axios.get(`${url}/dashboard/coordinates`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}