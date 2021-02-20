import React, { useContext } from 'react'
import { Container, Button, RoomInput, HostFocusOption, Confirm } from '../styled';
import useInput from './../../../utils/hooks/useInput';
import { observer } from 'mobx-react-lite';
import { context } from '../../../index';
import styled from 'styled-components';


const HostFocused = observer(({ back }) => {
    const store = useContext(context);

    // const handleEnter = (event) => {
    //     if (event.key === 'Enter') {
    //         event.preventDefault();
    //         handleJoin();
    //     }
    // }

    const handleBack = (event) => {
        if (event.target.id === 'container') {
            back();
        }
    }


    return (
        <Container id="container" onClick={e => handleBack(e)}>
            <div style={{ 'display': 'flex', 'justifyContent': 'space-around' }}>
                <HostFocusOption variant='dark' onClick={() => back()}>No</HostFocusOption>
                <HostFocusOption variant='dark' onClick={() => store.io.createRoom()}>Yes</HostFocusOption>
            </div>
            <Confirm>Confirm</Confirm>
        </Container>
    )
});

export default HostFocused