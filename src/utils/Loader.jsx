import React, { useContext } from 'react';
import styled, {keyframes} from 'styled-components';
import colors from './style/colors';
import {PageThemeContext} from './PageThemeContext';

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
    `;

const Loader = styled.div`
    padding: 10px;
    border: 6px solid ${props => colors[props.theme].primary};
    border-bottom-color: transparent;
    border-radius: 22px;
    animation: ${rotate} 1s infinite ease;
    height: 0;
    width: 0;
    margin:auto;
    `;

export default function LoadingAnimation(){
    const {theme} = useContext(PageThemeContext);
    return <Loader theme={theme} data-testid="loader"/>;
}