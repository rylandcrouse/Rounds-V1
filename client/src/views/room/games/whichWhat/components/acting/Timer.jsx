import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { context } from '../../../../../../index';
import Video from '../../../../components/video/video';
import { ActingBox, Info, SideOpts, Word } from './styled';
import Overlay from './../overlay/Overlay'


const Timer = observer(() => {
    const store = useContext(context);
    const room = store.io.room;
    const actingState = room.game.playerStates[room.game.turn.player]
    const [toEnd, setToEnd] = useState(calcTimeUntil(store.io.room.game.turn.endTime));
    const [toStart, setToStart] = useState(calcTimeUntil(store.io.room.game.turn.startTime));

    useEffect(() => {
        const timer = setInterval(() => {
            const leftToStart = calcTimeUntil(store.io.room.game.turn.startTime)
            setToStart(leftToStart);

            const leftToEnd = calcTimeUntil(store.io.room.game.turn.endTime)
            setToEnd(leftToEnd);

            if (leftToEnd < 0 && store.io.socket.id === room.game.turn.player) {
                store.io.passTurn();
                console.log('.........')
            }
        }, 1000);
        return () => {
            return clearInterval(timer);
        }
    }, [room.game.turn.player])

    function calcTimeUntil(time) {
        return Math.floor((time - Date.now()) / 1000);
    }

    return (
        <Word>
            {toStart < 0 && store.io.socket.id === room.game.turn.player && room.game.turn.word}
            {' '}
            {toStart > 0 && toStart}
            {toEnd > 0 && toStart < 0 && toEnd}
            {' '}
        </Word>
    )
});

export default Timer;