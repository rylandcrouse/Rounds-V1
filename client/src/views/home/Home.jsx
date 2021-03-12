import React, { useMemo, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { context } from '../../index';
import { Container, Button, RoomInput, Logout } from './styled';
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
    if (!store.auth.user) return <Redirect to='/login' />


    return (
        <Container >
            <Logout onClick={() => store.auth.signOut()} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
            </Logout>
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
            {focused === 'join' && <><JoinFocused back={() => setFocused('')} /></>}
            {focused === 'host' && <><HostFocused back={() => setFocused('')} /></>}


            {/* <RoomInput></RoomInput> */}


        </Container>
    )
});

export default Home
