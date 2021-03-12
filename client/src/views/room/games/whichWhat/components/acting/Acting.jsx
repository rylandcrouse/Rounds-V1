import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { context } from '../../../../../../index';
import Video from '../../../../components/video/video';
import { ActingBox, Info, SideOpts, Word } from './styled';
import Overlay from './../overlay/Overlay'
import Timer from './Timer';


const Acting = observer(() => {
    const store = useContext(context);
    const room = store.io.room;
    const actingState = room.game.playerStates[room.game.turn.player]
    const turnState = store.io.room.game.turn

    useEffect(() => {
        console.log('rerender')
    }, [])

    return ( 
        <>
      { actingState &&
      <>
           <ActingBox id="actingBox" key={Math.random()}>
            <Info>
                <SideOpts>

                </SideOpts>

                <Timer turnState={turnState}/>

                <SideOpts>

                </SideOpts>
            </Info>
            <Overlay playerState={actingState} />
            <Video className="acting" id={actingState.socketId} />
        </ActingBox>
        </>
    }
    </>
    )
});

export default Acting;