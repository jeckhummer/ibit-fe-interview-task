import * as React from 'react';
import styled from 'styled-components';
import { Deal } from '../models';

const Button = styled.button`
    font-weight: 700;
    font-size: 16px;
    border: 0px;
    background: rgba(0, 163, 255, 0.1);
    border-radius: 6px;
    padding: 7px 15px;
    margin-top: 24px;
    color: #00A3FF;
`;

export const Table: React.FC<{
    deals: Deal[];
    onNextPageButtonClick: () => void;
    nextPageAvailable: boolean;
}> = ({
    deals,
    onNextPageButtonClick,
    nextPageAvailable,
}) => {
    return (
        <>
            {deals.map(x => (
                <div key={x.id}>{x.value} -- {x.date}</div>
            ))}

            {nextPageAvailable && (
                <Button onClick={onNextPageButtonClick}>
                    Load next page
                </Button>
            )}
        </>
    );
};