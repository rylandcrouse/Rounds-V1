import styled from 'styled-components';
import { Form, Button as BSButton, Modal as Nodal } from 'react-bootstrap';
import("./styles.css");

export const Bod = styled(Nodal.Body)`
    width: 60%;
    max-width: 100%;
`;



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

