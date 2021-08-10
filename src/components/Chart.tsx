import * as React from 'react';
import styled from 'styled-components';

const Mock = styled.div`
    height: 290px;
    background: linear-gradient(180deg, #1E2530 0%, #293341 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Chart: React.FC = () => {
    return (
        <Mock>
            Chart
        </Mock>
    );
};