import { AxiosInstance } from "axios";

import { PaginatedDeals } from "../models";

export interface IDealService {
    getDealsPage: (page?: number) => Promise<PaginatedDeals>;
}

export class DealService implements IDealService {
    public constructor(private readonly axios: AxiosInstance) { }

    public getDealsPage = async (page?: number): Promise<PaginatedDeals> => {
        const qs = page !== undefined
            ? '?page=' + page
            : '';

        return (await this.axios.get<PaginatedDeals>('/deals' + qs)).data;
    };
}
