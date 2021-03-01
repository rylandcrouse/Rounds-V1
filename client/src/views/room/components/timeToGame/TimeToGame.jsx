import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { context } from '../../../../index.js';
import { Countdown } from './styled';


const TimeToGame = observer(({ setCDComplete }) => {
    const store = useContext(context);
    const [timeLeft, setTimeLeft] = useState(calcTimeToGame());

    useEffect(() => {
        const timer = setInterval(() => {
            if (!store.io.room.game) return

            // if (!store.io.room) setCDComplete(true)
            const left = calcTimeToGame()
            if (left < 0) {
                setCDComplete(true)
            } else {
                setCDComplete(false)

            }
            setTimeLeft(left);
        }, 1000);
        return () => {
            return clearInterval(timer);
        }
    }, [])

    function calcTimeToGame() {
        return Math.floor((store.io.room.game.startTime - Date.now()) / 1000);
    }

    return (
        <>
        {
            timeLeft > 0 &&
            <Countdown>
                Game starting in {timeLeft}
            </Countdown>
        }
        </>
    )
});

export default TimeToGame;
