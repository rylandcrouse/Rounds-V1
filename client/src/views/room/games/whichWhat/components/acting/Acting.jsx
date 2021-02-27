import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef } from 'react'
import { context } from '../../../../../../index';
import Video from '../../../../components/video/video';
import { ActingBox, Info, SideOpts, Word } from './styled';
import Overlay from './../overlay/Overlay'


const Acting = observer(({ setActHeight, gameHeight }) => {
    const store = useContext(context);
    const room = store.io.room;
    const actingState = Object.values(room.game.playerStates)[room.game.turn.player]
    useEffect(() => {
        console.log(actingState)
        return () => {
            return
        }
    }, [])

    return (
        <ActingBox id="actingBox" gameHeight={gameHeight} key={Math.random()}>
            <Info>
                <SideOpts>

                </SideOpts>

                <Word>{room.game.turn.word}</Word>

                <SideOpts>

                </SideOpts>
            </Info>
            <Overlay playerState={actingState} />
            <Video className="acting" id={actingState.socketId} />
        </ActingBox>
    )
});

export default Acting;