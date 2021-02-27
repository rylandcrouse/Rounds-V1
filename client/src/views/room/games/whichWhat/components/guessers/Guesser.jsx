import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef } from 'react'
import { context } from '../../../../../../index';
import Video from '../../../../components/video/video';
import { GuesserVidBox } from './styled';
import Overlay from './../overlay/Overlay'


const WhichWhat = observer(({ playerSocketId }) => {
    const store = useContext(context);
    const room = store.io.room;
    const playerState = room.game.playerStates[playerSocketId]
    // const videoRef = useRef(null);
    useEffect(() => {
        console.log('1111111111111')
        console.log(playerState)
        console.log('1111111111111')

    }, [])


    return (
        <GuesserVidBox >
            <Overlay playerState={playerState} />
            <Video id={playerSocketId} />
        </GuesserVidBox>
    )
});

export default WhichWhat;