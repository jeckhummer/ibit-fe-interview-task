import * as React from "react";
import styled from "styled-components";

import { useAsyncDeals } from "../hooks";
import { Deal } from "../models";
import { Chart } from "./Chart";
import { Header } from "./Header";
import { Table } from "./Table";

const Button = styled.button`
    font-weight: 700;
    font-size: 16px;
    border: 0px;
    background: rgba(0, 163, 255, 0.1);
    border-radius: 6px;
    padding: 7px 15px;
    color: #00A3FF;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
`;

const App: React.FC = () => {
    const {dealsAsync, loadNextPage} = useAsyncDeals();
    const [selected, setSelected] = React.useState<Deal | null>(null);

    // triggers first fetching
    React.useEffect(loadNextPage, []);

    return (
        <>
            <Header/>
            {/* [TODO] Error boundary
            <br/>
            [TODO] Loader
            <br/>
            [TODO] Error handling
            <br/> */}
            {dealsAsync.status === 'loading' && dealsAsync.initial && <>Loading...</>}
            {dealsAsync.status === 'error' && <>Error: {dealsAsync.error}</>}
            {(dealsAsync.status === 'success' || dealsAsync.status === 'loading' && !dealsAsync.initial) && (
                <>
                    <Chart
                        selectedDeal={selected}
                        onDealSelect={setSelected}
                        deals={dealsAsync.data.data}
                    />
                    <Table
                        selectedDeal={selected}
                        onDealSelect={setSelected}
                        deals={dealsAsync.data.data} 
                    />
                    {dealsAsync.data.hasNextPage && (
                        <ButtonWrapper>
                            <Button onClick={loadNextPage}>
                                {dealsAsync.status === 'loading' 
                                    ? "Loading..."
                                    : "Load next page"
                                }
                            </Button>
                        </ButtonWrapper>
                    )}
                    <br/>
                    <br/>
                    <br/>
                </>
            )}
        </>
    );
};

export default App;
