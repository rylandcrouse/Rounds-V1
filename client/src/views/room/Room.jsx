import { observer } from 'mobx-react-lite';
import React, {useContext, useEffect, useRef} from 'react'
import { Redirect } from 'react-router-dom';
import { context } from '../../index';
import { Container } from './styled';


const Room = observer(() => {
    const store = useContext(context);
    if (!store.io.room) return <Redirect to='/home' />
    const videoRef = useRef(null);


    useEffect(() => {
        videoRef.current.srcObject = store.io.media
        console.log(store.io.room.id)
        console.log(store.io.media)

    }, [store.io.room, store.io.media])

    
    return (
        <Container>
            <div>videosss</div>
            <video ref={videoRef} autoPlay playsInline src={store.io.media}/>
        </Container>
    )
});

export default Room;
