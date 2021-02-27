import styled from 'styled-components';
import { Form } from 'react-bootstrap';


export const ActionHistory = styled.div`
    width: 100%;
    height: 92%;

    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: flex-start;
`;


export const InputGuess = styled.input`
    // margin-bottom: 0.1em;
    width: 100%;
    border-color: #f0f0f0;
    height: 8%;
    font-size: 1rem;
    border-radius: 0%;
    border: none;
    background-color: #ededed;


    &:focus {
        outline: none;
    }
`;


export const ActionBox = styled.div`
    height: ${props => props.actHeight * 0.9}px;
    max-height: 98.65%;
    border-radius: 1px;
    // padding: 0.5em 0;
    background-color: #e9e9e9;
    display: flex;
    // margin-bottom: 0 0.16em;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const History = styled.div`
    width: 100%;
    height: 92%;

`;