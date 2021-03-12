import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef } from 'react'
import { context } from '../../../../../../index';
import Video from '../../../../components/video/video';
import { Banner, OverlayGrid, Bottom, Info } from './styled';
// import { ResizeObserver } from 'resize-observer';


const Overlay = observer(({ playerState }) => {
    const store = useContext(context);
    const room = store.io.room;

    useEffect(() => {
        console.log(playerState)
        return () => {
            return
        }
    }, [])

    return (
        <OverlayGrid>

            <Info>
                {playerState.score}
            </Info>
            < Banner bg={playerState.color} >

            </Banner >
        </OverlayGrid>
    )
});

export default Overlay;