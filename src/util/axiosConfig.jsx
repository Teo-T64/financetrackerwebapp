import axios from "axios";
import { BASE_URL } from "./apiEndpoints";


const axiosConfig = axios.create({
    baseURL : BASE_URL,
    headers : {
        "Content-Type" : "application/json",
        Accept : "application/json"
    }
})

const excludeEndpoints = [
    "/login", "/register", "health", "/activate", "/status"
];

axiosConfig.interceptors.request.use((config)=>{
    const skipToken = excludeEndpoints.some((endpoint)=>{
        config.url.includes(endpoint)
    })
    if(!skipToken){
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
},(err)=>{
    return Promise.reject(err);
})

axiosConfig.interceptors.response.use((res)=>{
    return res;
},(err)=>{
    if(err.res){
        if(err.res.status === 401){
            window.location.href = "/login";
        }else if(err.res.status === 500){
            console.error("Server error. Try again later.");
            
        }
    }else if(err.code === "ECONNABORTED"){
        console.error("Request timeout. Try again.");
        
    }
    return Promise.reject(err);
})

export default axiosConfig;