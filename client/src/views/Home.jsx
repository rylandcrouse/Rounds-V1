import React, {useMemo, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {context} from './../index';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #010101;
`;

const Home = observer(() => {
    const store = useContext(context);
    useMemo(() => store.io.connect(), []);

    return (
        <Container>
            {store.auth.user.email}
        </Container>
    )
});

export default Home
