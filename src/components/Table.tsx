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
    border: 1px solid #343E4D;
    border-left: 0;
    border-right: 0;
    `;
const TR = styled.tr<{selected?: boolean}>`
    color: ${props => props.selected ? 'white' : '#CAD3E8'};
    background-color: ${props => props.selected ? 'rgba(133, 211, 255, 0.09)' : 'transparent'};
`;

export const Table: React.FC<{
    deals: Deal[];
    selectedDeal: Deal | null,
    onDealSelect: (deal: Deal) => void,
}> = ({
    deals,
    selectedDeal,
    onDealSelect,
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
                    <TR 
                        onClick={() => onDealSelect(x)} 
                        selected={x === selectedDeal} 
                        key={x.id}
                    >
                        <TD> {x.value} </TD>
                        <TD secondary> {dateformat(x.date, "dd mmm yyyy HH:MM:ss", true)} </TD>
                    </TR>
                ))}
            </TBody>

        </_Table>
    );
};