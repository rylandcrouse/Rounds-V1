import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { context } from '../../../../../../index';
import Video from '../../../../components/video/video';
import { ActingBox, Info, SideOpts, Word } from './styled';
import Overlay from './../overlay/Overlay'
import Timer from './Timer';


const Acting = observer(({ setActHeight, gameHeight }) => {
    const store = useContext(context);
    const room = store.io.room;
    const actingState = room.game.playerStates[room.game.turn.player]


    return (
        <ActingBox id="actingBox" gameHeight={gameHeight} key={Math.random()}>
            <Info>
                <SideOpts>

                </SideOpts>

                <Timer />

                <SideOpts>

                </SideOpts>
            </Info>
            <Overlay playerState={actingState} />
            <Video className="acting" id={actingState.socketId} />
        </ActingBox>
    )
});

export default Acting;