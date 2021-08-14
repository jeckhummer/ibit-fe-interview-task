import { AxiosInstance } from "axios";

import { DealDTO, PaginatedData, PaginatedDeals } from "../models";

export interface IDealService {
    getDealsPage: (page?: number) => Promise<PaginatedDeals>;
}

export class DealService implements IDealService {
    public constructor(private readonly axios: AxiosInstance) { }

    public getDealsPage = async (page?: number): Promise<PaginatedDeals> => {
        const qs = page !== undefined
            ? '?page=' + page
            : '';
        const dto = (await this.axios.get<PaginatedData<DealDTO>>('/deals' + qs)).data;

        return {
            ...dto,
            data: dto.data.map(x => ({
                ...x,
                date: new Date(x.date)
            })),
        };
    };
}
