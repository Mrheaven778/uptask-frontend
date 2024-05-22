import { getCookie } from "@/utils/cookis";
import axios from "axios";

const instance = axios.create({
    baseURL: 'https://uptask-api-production.up.railway.app/api/',
    
    // baseURL: 'http://localhost:4000/api/',
});

instance.interceptors.request.use(
    async (config) => {
        const token = await getCookie()
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default instance;
