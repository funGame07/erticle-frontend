import axios from "axios";

const axiosAuth = axios.create({
    baseURL: import.meta.env.VITE_API_AUTH,
    withCredentials: true,
    headers: {"Content-Type": "application/json"}
})

export const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_API_AUTH,
    withCredentials: true,
    headers: {"Content-Type": "application/json"}
})

export const axiosArticle = axios.create({
    baseURL: import.meta.env.VITE_API_ARTICLE,
    withCredentials: true,
    headers: {"Content-Type": "application/json"}
})

export const axiosUser = axios.create({
    baseURL: import.meta.env.VITE_API_USER,
    withCredentials: true,
    headers: {"Content-Type": "application/json"}
})

export default axiosAuth