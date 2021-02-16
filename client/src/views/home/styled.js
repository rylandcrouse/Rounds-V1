import styled, {keyframes} from 'styled-components';
import { Button as BSButton, FormControl } from 'react-bootstrap';


const Grow = keyframes`
    0% {width: 1px;}
    99.9% {width: 16%;}
    100% {min-width: 100px;}
`;

export const RoomInput = styled(FormControl)`
    max-width: 16%;
    border-radius: 30px;
    margin: 1em;

    -webkit-animation-fill-mode:forwards;
    animation-fill-mode:forwards;

    animation-name: ${Grow};
    animation-duration: 1.4s;
    animation-iteration-count: once;
`;


export const Button = styled(BSButton)`
    varient: dark;
    border-radius: 50px;
    margin: 1em;
    background-color: black;
    border: 1px solid black;
    min-width: 80px;
    max-width: 90px;

    &:hover {
        background-color: white;
        color: black;
        border: 1px solid black;
    }
`;

export const HostFocusOption = styled(Button)`
    -webkit-animation-fill-mode:forwards;
    animation-fill-mode:forwards;

    animation-name: ${Grow};
    animation-duration: 0.7s;
    animation-iteration-count: once;
`;

export const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Confirm = styled.div`
    padding: 0.5em 0.9em;
    border-radius: 30px;
    border: 1px solid black;

    &:hover {
        background-size: 100%;
    }
`;