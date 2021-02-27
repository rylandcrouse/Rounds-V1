import styled from 'styled-components';


export const OverlayGrid = styled.div`
    position: absolute;
    border-radius: 5px;
    width: 100%;
    height: 97%;
    max-height: 100%;
    display: grid;
    grid-template-rows: 5px auto;
`;

export const Info = styled.div`
    position: absolute;
    font-size: 0.92vmax;
    height: 16%
    left: 0;
    bottom: 1%;
    text-align: center;
    opacity: 0.5;
    color: white;
    padding: 0.2vmin;
    background-color: black;

`;

export const Banner = styled.div`
    width: 100%;
    background-color: ${props => props.bg};
    // position: absolute;
    height: 100%
    text-align: center;
    opacity: 0.8;
    border-radius: 7px;

`;

export const Bottom = styled.div`
    max-height: 10%;
    background-color: ${props => props.bg};
    display: grid;
    // position: relative;
    font-size: 75%;
    bottom: 0;
    text-align: center;
`;