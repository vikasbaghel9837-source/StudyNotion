import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://studynotion-h1ln.onrender.com/api/v1",
});

export const apiConnector = (method , url , bodyData , headers , params )=>{
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodyData?bodyData : null,
        headers:headers?headers : null,
        params:params?params:null
    });
} 