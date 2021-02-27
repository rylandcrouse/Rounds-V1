import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef } from 'react'
import { context } from '../../../../../../index';
import { GuessersBox, GuesserVidBox } from './styled';
import Guesser from './Guesser';

const WhichWhat = observer(({ gameHeight }) => {
    const store = useContext(context);
    const room = store.io.room;
    // const videoRef = useRef(null);
    useEffect(() => {
        console.log(room)
    }, [])


    return (
        <GuessersBox gameHeight={gameHeight}>
            {Object.keys(store.io.streams).map(id => <Guesser playerSocketId={id} />)}
        </GuessersBox>
    )
});

export default WhichWhat;