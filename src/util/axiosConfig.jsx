import axios from "axios";
import { BASE_URL } from "./apiEndpoints";

const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})

const excludeEndpoints = [
    "/login", "/register", "health", "/activate", "/status","/home"
];

axiosConfig.interceptors.request.use((config) => {
    const skipToken = excludeEndpoints.some((endpoint) => {
        return config.url.includes(endpoint);
    });

    if (!skipToken) {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
}, (err) => {
    return Promise.reject(err);
});

axiosConfig.interceptors.response.use((res) => {
    return res;
}, (err) => {

    if (err.response) {
        if (err.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/home";
        } else if (err.response.status === 500) {
            console.error("Server error. Try again later.");
        }
    } else if (err.code === "ECONNABORTED") {
        console.error("Request timeout. Try again.");
    }
    return Promise.reject(err);
});

export default axiosConfig;