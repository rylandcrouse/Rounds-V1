import { observer } from 'mobx-react-lite';
import React, {useContext, useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import { context } from '../../index';
import { Container } from './styled';


const Room = observer(() => {
    const store = useContext(context);
    if (!store.io.room) return <Redirect to='/home' />

    useEffect(() => {
        console.log(store.io.room.id)
    }, [store.io.room])

    
    return (
        <Container>
            <div>videosss</div>
        </Container>
    )
});

export default Room;
