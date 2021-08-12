import axios, { AxiosInstance } from "axios";

import { IEnvVarService } from "./envVarService";

export class AxiosService {
    public constructor(private readonly envVarService: IEnvVarService) { }

    public getInstance(): AxiosInstance {
        const instance = axios.create();

        instance.interceptors.request.use(
            config => ({
                ...config,
                baseURL: this.envVarService.nodeEnv === "development"
                    ? "http://localhost:3000"
                    : "https://stormy-hollows-71386.herokuapp.com/",
            }),
            err => Promise.reject(err),
        );

        return instance;
    }
}
