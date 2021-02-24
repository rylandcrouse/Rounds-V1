import styled from 'styled-components';

export const GuesserVidBox = styled.div`
    border-radius: 4%;
    width: 95%;
    padding: 1px;
`;

export const GuessersBox = styled.div`
    margin: 0.2em;
    // width: 12%;
    max-height: ${props => props.gameHeight}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    // @media (min-width: 1065px) {
    //     width: 20%;
    //     height: ${100 / 7}%;
    //     flex-flow: column nowrap;
    //     margin-right: 0.7em;
    // }
`;