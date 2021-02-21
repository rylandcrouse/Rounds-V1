import { Observer, observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef } from 'react'
import { Redirect } from 'react-router-dom';
import { context } from '../../index';
import Video from './components/video/video';
import { Container, DefaultVideos, RoomIdBox, Options, SideOpts, LeaveBtn, Content } from './styled';


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


    const handleLeave = () => {
        console.log('leaving');
        store.io.handleLeave();
    }

    return (
        <Container>
            <Options>   
                <SideOpts>
                    <LeaveBtn onClick={() => handleLeave()}>
                        Leave
                    </LeaveBtn>
                </SideOpts>
                <RoomIdBox style={{'float': 'left'}}>{store.io.room.id}</RoomIdBox>
                <SideOpts>

                </SideOpts>

            </Options>
            <Content>
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
                {Object.keys(store.io.streams).map(id => <Video id={id} key={id} />)}
            </DefaultVideos>
            </Content>
        </Container>
    )
});

export default Room;
