import axios, { AxiosInstance } from "axios";

class HTTP {
    instance: AxiosInstance
    constructor() {
        this.instance = axios.create({
            baseURL: 'http://localhost:3000/',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
    }
}

export const http = new HTTP().instance

export interface IResponse<T> {
    success: boolean
    result: T
}