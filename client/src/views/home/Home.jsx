import React, { useMemo, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { context } from '../../index';
import { Container, Button, RoomInput } from './styled';
import JoinModal from './components/JoinModal';
import JoinFocused from './states/JoinFocused';

const Home = observer(() => {
    const store = useContext(context);
    useMemo(() => store.io.connect(), []);

    const [focused, setFocused] = useState('');

    return (
        <Container >
            {/* {store.auth.user.email} */}

            {!focused &&
            <>
                <Button onClick={() => setFocused('join')} variant='dark' >Join</Button>
                <Button variant='dark' >Host</Button>
            </>
            }
            {focused === 'join' && 
            <>
                <JoinFocused/>
            </>
                    //   <Button variant='dark' >Host</Button>
            
            }

            {/* <RoomInput></RoomInput> */}


        </Container>
    )
});

export default Home
