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


export const InputGuess = styled(Form.Control)`
    margin-top: 0.1em;
    width: 100%;
    border-color: #f0f0f0;
    height: 8%;
    font-size: 1.3em;
`;


export const ActionBox = styled.div`
    margin: 0.2em;
    height: ${props => props.actHeight}px;
    // max-height: ${props => props.actHeight}px;
    border-radius: 1%;
    padding: 0.2em;
    background-color: #ededed;
    display: flex;
    
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const History = styled.div`
    width: 100%;
    height: 92%;

`;