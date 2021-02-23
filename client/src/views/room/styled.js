import styled, { keyframes } from 'styled-components';
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


export const Container = styled.div`
    width: 100vw;
    height: 100vh;

    // display: flex;
    // flex-direction: column;
    // align-items: center;
`;

export const Options = styled.div`
    width: 99%;
    height: 8%;
    // border: 1px solid black;
    border-radius: 5px;
    margin: 2px;
    padding: 0.2em;

    display: flex;
    // flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const SideOpts = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

export const Content = styled.div`
    width:100%;
    height: 92%;
    // border: 1px solid black;
    border-radius: 5px;
    margin: 1px;

    display: flex;
    // flex-direction: column;
    align-items: center;
    justify-content: center;
`;


export const DefaultVideos = styled.div`
    width: 90%;
    max-width: 90%;
    max-height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-flow: row wrap;

`;

export const RoomIdBox = styled.div`
    border-radius: 0.6em;
    padding: 0.85em;
    margin: 0.8em 0.1em 0.8em 0.1em;
    text-align: center;
    background-color: #f4f4f4;
    font-size: 0.88em;
    display:flex;
    align-items:center;
`;

export const LeaveBtn = styled.div`
    color: #3b3b3b;
    border-radius: 0.6em;
    padding: 0.2em 0.65em;
    margin: 1em;
    text-align: center;
    background-color: #f4f4f4;
    font-size: 0.94em;

    &:hover {
        background-color: #c2c2c2;
        cursor: pointer;
    }
`;

export const DfltVidBox = styled.div`
    border-radius: 5%;
    max-width: 230px;
    padding: 2px;
    // height: 30%;
    // border-collapse: separate; 
    margin: 2px;

    @media (max-width: 780px) {
        // visibility: hidden;
        max-width: 28%;
      }
    
`;