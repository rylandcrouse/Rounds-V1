import React, {useMemo, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {context} from '../../index';
import {Container, Button} from './styled';

const Home = observer(() => {
    const store = useContext(context);
    useMemo(() => store.io.connect(), []);

    return (
        <Container>
            {store.auth.user.email}
            
            <Button variant='dark' onClick={() => store.io.joinRoom('300000')}>Join</Button>
            <Button variant='dark' onClick={() => store.io.joinRoom('300000')}>Host</Button>
        </Container>
    )
});

export default Home
