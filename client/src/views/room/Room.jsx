import { Observer, observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef } from 'react'
import { Redirect } from 'react-router-dom';
import { context } from '../../index';
import Video from './components/video/video';
import { Container, DefaultVideos, RoomIdBox } from './styled';


const Room = observer(() => {
    const store = useContext(context);
    if (!store.io.room) return <Redirect to='/home' />
    // const videoRef = useRef(null);


    useEffect(() => {
        // videoRef.current.srcObject = store.io.media
        // console.log(store.io.room.id)
        // console.log(store.io.media)
        console.log(store.io.streams)
        console.log(Object.keys(store.io.streams))
    }, [store.io.room, store.io.media, store.io.streams])


    return (
        <Container>
            <RoomIdBox>{store.io.room.id}</RoomIdBox>
            <DefaultVideos>
                {Object.keys(store.io.streams).map(id => <Video id={id} key={id} />)}
                {Object.keys(store.io.streams).map(id => <Video id={id} key={id} />)}
                {Object.keys(store.io.streams).map(id => <Video id={id} key={id} />)}
                {Object.keys(store.io.streams).map(id => <Video id={id} key={id} />)}
                {Object.keys(store.io.streams).map(id => <Video id={id} key={id} />)}
                {Object.keys(store.io.streams).map(id => <Video id={id} key={id} />)}
                {Object.keys(store.io.streams).map(id => <Video id={id} key={id} />)}
                {Object.keys(store.io.streams).map(id => <Video id={id} key={id} />)}
                {Object.keys(store.io.streams).map(id => <Video id={id} key={id} />)}
             

            </DefaultVideos>
        </Container>
    )
});

export default Room;
