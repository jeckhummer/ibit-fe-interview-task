import * as React from 'react';
import styled from 'styled-components';
import dateformat from 'dateformat';

import { Deal } from '../models';

const _Table = styled.table`
    text-align: left;
    border-spacing: 0;
    border-collapse: collapse;
    width: 100%;
`;
const TBody = styled.tbody`
    background-color: rgba(255, 255, 255, 0.02);
`;
const TH = styled.td`
    padding: 17px 20px;
    font-weight: 700;
`;
const TD = styled.td<{secondary?: boolean}>`
    padding: 17px 20px;
    font-weight: ${props => props.secondary ? 400 : 700};
    color: #CAD3E8;
    border: 1px solid #343E4D;
    border-left: 0;
    border-right: 0;
`;

export const Table: React.FC<{
    deals: Deal[];
}> = ({
    deals,
}) => {
    return (
        <_Table>
            <thead>
                <tr>
                    <TH> Value </TH>
                    <TH> Date and time </TH>
                </tr>
            </thead>
            <TBody>
                {deals.map(x => (
                    <tr key={x.id}>
                        <TD> {x.value} </TD>
                        <TD secondary> {dateformat(x.date, "dd mmm yyyy HH:MM:ss")} </TD>
                    </tr>
                ))}
            </TBody>

        </_Table>
    );
};