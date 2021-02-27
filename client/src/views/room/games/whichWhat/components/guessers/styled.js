import styled from 'styled-components';

export const GuesserVidBox = styled.div`
    width: 100%;
    position: relative;
    // border: 2px solid green;
`;


export const GuessersBox = styled.div`
    max-height: ${props => props.gameHeight}px;
    margin-right: 0.13em;
    // border: 1px solid red;

    display: grid;
    grid-template-rows: 20% 20% 20% 20% 20%;

`;