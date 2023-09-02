import axios, { AxiosInstance } from 'axios';

const ApiService: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    // timeout: 10000, // optional timeout
    headers: {
        'Content-Type': 'multipart/form-data', // Set default headers if needed
    },
});

export default ApiService;