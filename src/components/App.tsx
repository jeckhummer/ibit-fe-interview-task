import * as React from "react";
import { useAsyncDeals } from "../hooks";

import { Chart } from "./Chart";
import { Header } from "./Header";
import { Table } from "./Table";

const App: React.FC = () => {
    const {dealsAsync, loadNextPage} = useAsyncDeals();

    // triggers first fetching
    React.useEffect(loadNextPage, []);

    return (
        <>
            <Header/>
            [TODO] Error boundary
            <br/>
            [TODO] Loader
            <br/>
            [TODO] Error handling
            <br/>
            {dealsAsync.status === 'loading' && <>Loading...</>}
            {dealsAsync.status === 'error' && <>Error: {dealsAsync.error}</>}
            {dealsAsync.status === 'success' && (
                <>
                    <Chart/>
                    <Table
                        deals={dealsAsync.data.data} 
                        onNextPageButtonClick={loadNextPage}
                        nextPageAvailable={dealsAsync.data.hasNextPage}
                    />
                </>
            )}
        </>
    );
};

export default App;
