import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://studynotion-1-uhtj.onrender.com/api/v1",
});

export const apiConnector = (method , url , bodyData , headers , params )=>{
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodyData?bodyData : null,
        headers:headers,
        params:params?params:null
    });
} 