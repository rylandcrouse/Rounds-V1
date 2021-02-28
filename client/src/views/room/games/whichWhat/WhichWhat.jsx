import { Observer, observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import { context } from '../../../../index.js';
import { Container, GamePortion, Players, GuessInput } from './styled';
import { ResizeObserver } from 'resize-observer';

import Guessers from './components/guessers/Guessers'
import GuessActions from './components/guessWord/GuessWord'
import Acting from './components/acting/Acting'




const WhichWhat = observer(() => {
    const store = useContext(context);
    const room = store.io.room;
    const [gameHeight, setGameHeight] = useState()
    const [actHeight, setActHeight] = useState()
    
    useEffect(() => {
        console.log('WWWWW rerender')
    })


    // if (!store.io.room) return <Redirect to='/home' />

    return (
        <Container>
            {
                store.io.socket.id &&
                <GamePortion id="game">
                    <Guessers gameHeight={gameHeight} />
                    <Acting setActHeight={setActHeight} gameHeight={gameHeight} />
                    <GuessActions actHeight={actHeight} gameHeight={gameHeight}>

                    </GuessActions>
                </GamePortion>
            }
        </Container>
    )
});

export default WhichWhat;
