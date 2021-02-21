import styled from 'styled-components';
import { Form, Button as BSButton } from 'react-bootstrap';

export const IconCircle = styled.div`
    width: 77px;
    height: 77px;
    border: 0.13rem solid black;
    border-radius: 50%;
    background-color: #f7f7f7;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Button = styled(BSButton)`
    varient: dark;
    border-radius: 50px;
    margin: 0.15em 0 0.15em 0; 
    font-size: 0.82em;
    width: 65px;
`;

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;


export const Formy = styled(Form)`
    border: 1px solid #d6d6d6;
    border-radius: 0.6em;
    padding: 1.26em 2em 0.6em 2em;

    width: 330px;
    max-height: 450px;

    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: space-around;
    

    @media (max-width: 400px) {
        display: none;
    }
`;

export const Groupet = styled(Formy.Group)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    text-align: center;
    margin: 0.5em 0 0.5em 0;
`;

export const Inpoots = styled(Formy.Group)`
    margin: 0.5em 0 0.5em 0;
`;