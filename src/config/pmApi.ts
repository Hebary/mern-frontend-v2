import axios from 'axios';

export const pmApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
})