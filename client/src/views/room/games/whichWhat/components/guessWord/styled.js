import styled from 'styled-components';
import { Form } from 'react-bootstrap';


export const ActionHistory = styled.div`
    width: 97%;
    height: 88%;

    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
`;


export const InputGuess = styled(Form.Control)`
    width: 97%;
    border-color: #f0f0f0;
    margin: 0.1em;
    height: 10%;
    font-size: 1.4em;
`;


export const ActionBox = styled.div`
    height: ${props => props.actHeight / 1}px;
    // max-height: ${props => props.actHeight}px;
    border-radius: 2%;
    background-color: #ededed;
    display: flex;
    
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const History = styled.div`
    width: 100%;
    height: 82%;

`;