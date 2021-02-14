import styled from 'styled-components';
import { Form } from 'react-bootstrap';

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

    width: 370px;
    height: 60%;

    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: space-around;
    

    @media (max-width: 400px) {
        width: 95%
    }
`;