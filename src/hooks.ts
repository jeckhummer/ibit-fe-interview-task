import * as React from "react";
import { AsyncData, Deal, PaginatedData } from "./models";

import { useServices } from "./services";

export function useAsyncDeals() {
    const { dealsService } = useServices();
    const [dealsAsync, setDealsAsync] = React.useState<AsyncData<PaginatedData<Deal>>>(
        { status: 'initial' }
    );

    const loadNextPage = React.useCallback(
        () => {
            // we should skip fetching if there is no next page
            if (!(dealsAsync.status === 'success' && !dealsAsync.data.hasNextPage)) {
                if (dealsAsync.status === 'success') {
                    setDealsAsync({
                        status: 'loading',
                        initial: false,
                        data: dealsAsync.data,
                    });
                } else {
                    setDealsAsync({
                        status: 'loading',
                        initial: true,
                    });
                }

                const page = dealsAsync.status === 'success'
                    ? dealsAsync.data.page + 1
                    : undefined;

                dealsService.getDealsPage(page)
                    .then(data => setDealsAsync({
                        status: 'success',
                        data
                    }))
                    .catch(error => setDealsAsync({
                        status: 'error',
                        error
                    }));
            }
        },
        [dealsAsync]
    );

    return { loadNextPage, dealsAsync };
}