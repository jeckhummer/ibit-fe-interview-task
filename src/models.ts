export interface Deal {
    id: string;
    date: Date;
    value: number;
}

export type PaginatedData<T> = {
    data: T[],
    page: number,
    hasNextPage: boolean,
};

export type PaginatedDeals = PaginatedData<Deal>;

export type AsyncData<T> =
    | { status: "initial" }
    | { status: "loading"; initial: true } // loading for the first time
    | { status: "loading"; initial: false; data: T } // subsequent loading
    | { status: "success"; data: T }
    | { status: "error"; error: string };
