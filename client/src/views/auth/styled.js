import styled from 'styled-components';
import { Form, Button as BSButton } from 'react-bootstrap';

export const Button = styled(BSButton)`
    varient: dark;
    border-radius: 50px;
    margin: 1em 0 1em 0; 
    width: 75px;
`;

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// export const AuthWindow = styled.div`
//     width: 35%;
//     height: 60%;
//     min-width: 380px;
    
//     border: 1px solid black;

//     @media (max-width: 400px) {
//         width: 95%
//     }
// `;

export const Formy = styled(Form)`
    border: 1px solid #d6d6d6;
    border-radius: 0.5em;
    padding: 1.5em 3em 1.5em 3em;

    width: 330px;
    min-height: 40%;
    min-height: 300px;

    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: space-around;
    

    @media (max-width: 400px) {
        min-width: 0;
        width: 90%
    }
`;

export const Groupet = styled(Formy.Group)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    text-align: center;
    margin: 0.7em 0 0.7em 0;
`;

export const Inpoots = styled(Formy.Group)`
    margin: 0.7em 0 0.7em 0;
`;