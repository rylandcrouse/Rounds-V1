import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { context } from '../../../../../../index';
import Video from '../../../../components/video/video';
import { ActingBox, Info, SideOpts, Word } from './styled';
import Overlay from './../overlay/Overlay'


const Timer = observer(({turnState}) => {
    const store = useContext(context);
    const room = store.io.room;
    const [toEnd, setToEnd] = useState(calcTimeUntil(turnState.endTime));
    const [toStart, setToStart] = useState(calcTimeUntil(turnState.startTime));

    useEffect(() => {
        const timer = setInterval(() => {
            console.log('rerender TIMER')

            const leftToStart = calcTimeUntil(turnState.startTime)
            setToStart(leftToStart);

            const leftToEnd = calcTimeUntil(turnState.endTime)
            setToEnd(leftToEnd);

            if (leftToEnd < 0 && store.io.socket.id === turnState.player) {
                store.io.passTurn();
           
            }
        }, 1000);
        return () => {
            return clearInterval(timer);
        }
    }, [turnState])

    function calcTimeUntil(time) {
        return Math.floor((time - Date.now()) / 1000);
    }

    return (
        <Word>
            {toStart < 0 && store.io.socket.id === turnState.player && turnState.word}
            {' '}
            {toStart > 0 && toStart}
            {toEnd > 0 && toStart < 0 && toEnd}
            {' '}
        </Word>
    )
});

export default Timer;