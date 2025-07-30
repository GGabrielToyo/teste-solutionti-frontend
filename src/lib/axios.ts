import axios from "axios";
import { TokenService } from "@/services/token-service";

export const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL
});

api.interceptors.request.use(
    (config) => {
        const token = TokenService.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);