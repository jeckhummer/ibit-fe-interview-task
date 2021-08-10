import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: column;
`;
const Mock = styled.div`
    height: 370px;
    width: 100%;
    color: white;color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;
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

export const Table: React.FC = () => {
    return (
        <Wrapper>
            <Mock>
                Table
            </Mock>
            <Button>
                Load next page
            </Button>
        </Wrapper>
    );
};