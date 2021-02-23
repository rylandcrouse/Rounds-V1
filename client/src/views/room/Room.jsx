import { Observer, observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef } from 'react'
import { Redirect } from 'react-router-dom';
import { context } from '../../index';
import Default from './components/default/Default';
import { Container, RoomIdBox, Options, SideOpts, LeaveBtn, Content } from './styled';
import games from './games/';


const Room = observer(() => {
    const store = useContext(context);
    // const videoRef = useRef(null);
    
    
    useEffect(() => {
        // videoRef.current.srcObject = store.io.media
        // console.log(store.io.room.id)
        // console.log(store.io.media)
        console.log('**************')
        console.log(store.io.streams)
        console.log('**************')

        console.log(Object.keys(store.io.streams))
    }, [store.io.room, store.io.media, store.io.streams])
    
    
    const handleLeave = () => {
        console.log('leaving');
        store.io.handleLeave();
    }

    if (!store.io.room) return <Redirect to='/home' />
    
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
                { !store.io.room.game && <Default/>}
                { store.io.room.game && games[store.io.room.game.type]()}
            </Content>
        </Container>
    )
});

export default Room;
