import styled from 'styled-components';

export const ActingBox = styled.div`
    // width: 56%;
    // max-height: 100%;
    // width: ${props => props.gameHeight / 8 * 5}px;
    // max-height: ${props => props.gameHeight}px;
    position: relative;
`;

export const Overlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 17% 80% 3%;
`;

export const Banner = styled.div`
    width: 100%;
    background-color: ${props => props.bg};
    // background-color: black;
    // border-radius: 15px 15px 0% 0%;
`;
