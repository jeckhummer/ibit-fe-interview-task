import * as React from "react";

import { AxiosService } from "./axiosService";
import { DealService, IDealService } from "./dealService";
import { EnvVarService, IEnvVarService } from "./envVarService";

export interface IServices {
    envVarService: IEnvVarService;
    dealsService: IDealService;
}

export const ServiceContext = React.createContext<IServices>(null as any);

export const buildServices = (): IServices => {
    const envVarService = new EnvVarService();
    const axiosService = new AxiosService(envVarService);
    const axiosInstance = axiosService.getInstance();
    const dealsService = new DealService(axiosInstance);

    return {
        envVarService,
        dealsService,
    };
};

export const ServiceProvider: React.FC<{
    services: IServices;
}> = ({ children, services }) =>(
    <ServiceContext.Provider value={services}>
        {children}
    </ServiceContext.Provider>
);

export function useServices() {
    return React.useContext(ServiceContext);
}
