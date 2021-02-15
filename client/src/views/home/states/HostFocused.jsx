import React, {useContext} from 'react'
import { Container, Button, RoomInput, HostFocusOption, Confirm } from '../styled';
import useInput from './../../../utils/hooks/useInput';
import { observer } from 'mobx-react-lite';
import { context } from '../../../index';
import styled from 'styled-components';


const HostFocused = observer(({back}) => {
    const store = useContext(context);

    // const handleEnter = (event) => {
    //     if (event.key === 'Enter') {
    //         event.preventDefault();
    //         handleJoin();
    //     }
    // }


    return (
        <>
            <div>
                <HostFocusOption variant='dark' onClick={() => back()}>No</HostFocusOption>
                <HostFocusOption variant='dark' onClick={() => store.io.createRoom()}>Yes</HostFocusOption>
            </div>
            <Confirm>Confirm</Confirm>
        </>
    )
});

export default HostFocused