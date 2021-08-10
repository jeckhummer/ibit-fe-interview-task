import * as React from 'react';
import styled from 'styled-components';

import logo from '../../public/Logo.svg';

const Wrapper = styled.div`
    display: flex;
    height: 60px;
    padding: 0 20px;
    justify-content: space-between;
    background: linear-gradient(180deg, #1f252f 0%, #27303e 100%);
`;
const LeftSide = styled.div`
    display: flex;
    align-items:center;
`;
const RightSide = styled.div`
    display: flex;
    align-items:center;
`;
const Logo = styled.img.attrs({src: logo})`
    width: 36px;
`;
const ProductName = styled.span`
    margin-left: 7px;
    color: white;
    font-weight: 100;
    font-size: 21px;
`;
const NewDealButton = styled.button`
    font-weight: 700;
    font-size: 16px;
    background: linear-gradient(180deg, #3EAEFF 0%, #00AAE0 100%);
    box-shadow: 0px 0px 0px 3px rgba(0, 170, 224, 0.19);
    border-radius: 6px;
    border: 0px;
    padding: 6px 10px;
    color: white;
`;

export const Header: React.FC = () => {
    return (
        <Wrapper>
            <LeftSide>
                <Logo />
                <ProductName>Mango Deals</ProductName>
            </LeftSide>
            <RightSide>
                <NewDealButton onClick={() => alert(1)}>
                    New Deal
                </NewDealButton>
            </RightSide>
        </Wrapper>
    );
};