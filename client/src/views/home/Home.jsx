import React, { useMemo, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { context } from '../../index';
import { Container, Button, RoomInput } from './styled';
import JoinModal from './components/JoinModal';
import JoinFocused from './states/joinFocused';
import HostFocused from './states/HostFocused';
import { Redirect } from 'react-router-dom';


const Home = observer(() => {
    const store = useContext(context);
    useMemo(async () => {
        await store.io.connect();
    }, []);
    

    const [focused, setFocused] = useState('');

    if (store.io.room) return <Redirect to='/room' />

    return (
        <Container >
            {/* {store.auth.user.email} */}

            {!focused &&
            <>
            <span>
                <Button onClick={() => setFocused('join')} variant='dark' >Join</Button>
                <Button onClick={() => setFocused('host')} variant='dark' >Host</Button>
            </span>
                {/* <Button onClick={() => store.io.createRoom()} variant='dark' >Host</Button> */}
            </>
            }
            {focused === 'join' && <><JoinFocused/></>}
            {focused === 'host' && <><HostFocused back={() => setFocused('')}/></>}


            {/* <RoomInput></RoomInput> */}


        </Container>
    )
});

export default Home
