import styled from 'styled-components';

export const GuesserVidBox = styled.div`
    // border-radius: 1%;
    width: 100%;
    // padding: 1px;
    // flex-shrink: 1;
`;

export const GuessersBox = styled.div`
    // margin: 0.2em;
    // width: 12%;
    max-height: ${props => props.gameHeight}px;
    margin-right: 0.12em;

    display: grid;
    grid-template-row: 20% 20% 20% 20% 20%;
    // flex-direction: column;
    // align-items: center;
    // justify-content: space-around;

    // @media (min-width: 1065px) {
    //     width: 20%;
    //     height: ${100 / 7}%;
    //     flex-flow: column nowrap;
    //     margin-right: 0.7em;
    // }
`;