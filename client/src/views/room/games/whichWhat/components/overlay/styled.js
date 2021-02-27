import styled from 'styled-components';


export const OverlayGrid = styled.div`
    position: absolute;
    width: 100%;
    height: 99%;
    max-height: 99%;
    display: grid;
    grid-template-rows: 10% 66% 18% 8%;
`;

export const Banner = styled.div`
    width: 100%;
    // height: 100%;
    background-color: ${props => props.bg};
    border-radius: 0 7px 7px 0;
    position: relative;
    text-align: center;

`;

export const Info = styled.div`
    width: 100%;
    height: 100;
    background-color: #000000;
`;

export const Bottom = styled.div`
    // width: 100%;
    background-color: ${props => props.bg};
    display: grid;
    grid-template-columns: 40% 60%;
    // position: relative;
    font-size: 75%;
    text-align: center;
`;