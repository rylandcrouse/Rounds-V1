import styled, { keyframes } from 'styled-components';
import { Button as BSButton, FormControl } from 'react-bootstrap';

export const PlayButton = styled.svg`
    width: 1.5em;
    height: 1.5em;
    view-box: 0 0 16 16;
    fill: current-color;
`;

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

    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Options = styled.div`
    width: 100%;
    height: 7%;
    border-radius: 5px;
    display: flex;
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
    height: 90%;
    border-radius: 5px;
    position: relative;
    min-width: 610px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const DefaultVideos = styled.div`
    width: 85%;
    max-width: 65%;
    max-height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-flow: row wrap;

    @media (max-width: 1000px) {
        max-width: 90%;
      }

`;

export const RoomIdBox = styled.div`
    border-radius: 0.6em;
    padding: 0.5em 0.6em;
    // margin: 0.8em 0.1em 0.8em 0.1em;
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
    border-radius: 2%;
    width: 28%;
    padding: 2px;  
`;