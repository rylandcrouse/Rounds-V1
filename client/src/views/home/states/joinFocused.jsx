import React, { useContext } from 'react'
import { Container, Button, RoomInput } from '../styled';
import useInput from './../../../utils/hooks/useInput';
import { observer } from 'mobx-react-lite';
import { context } from '../../../index';
import styled from 'styled-components';


const StyledSVG = styled.svg`
    width: 2.4em;
    height: 2.4em;

    &:hover {
        cursor: pointer;
        color: red;
    }
`;


const JoinFocused = observer(({ back }) => {
    const [input, setInput, clearInput] = useInput({ roomId: '' })

    const store = useContext(context);

    const handleJoin = () => {
        console.log(input.roomId)
        store.io.joinRoom(input.roomId);
        clearInput();
        console.log('handling join...')
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleJoin();
        }
    }

    const handleBack = (event) => {
        console.log(event)
        if (['container', 'back-btn'].includes(event.target.id || event.currentTarget)) {
            back();
        }
    }

    return (
        <Container id="container" onClick={e => handleBack(e)}>
            <div >
                <StyledSVG id="back-btn" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                    <path id="back-btn" fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
                </StyledSVG>
                <Button variant='dark' >Join</Button>
                <svg style={{ visibility: "hidden" }} xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
                </svg>
            </div>

            <RoomInput onKeyPress={(e) => handleEnter(e)} name='roomId' value={input.roomId} onChange={(e) => setInput(e)} />
        </Container>
    )
});

export default JoinFocused
