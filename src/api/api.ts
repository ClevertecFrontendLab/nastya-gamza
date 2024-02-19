import axios from 'axios';
import {BASE_API_URL} from "@constants/api.ts";

export const instanceApi = axios.create({
    withCredentials: true,
    baseURL: BASE_API_URL,
});

instanceApi.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }

    return config;
})
