import { Observer, observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import { context } from '../../../../index.js';
import { Container, GamePortion, Players, GuessInput} from './styled';
import { ResizeObserver } from 'resize-observer';

import Guessers from './components/guessers/Guessers'
import GuessActions from './components/guessWord/GuessWord'
import Acting from './components/acting/Acting'




const WhichWhat = observer(() => {
    const store = useContext(context);
    const room = store.io.room;
    const [gameHeight, setGameHeight] = useState()
    const [actHeight, setActHeight] = useState()

    // const videoRef = useRef(null);
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            console.log(entries[0]['contentRect']);
            setGameHeight(entries[0]['contentRect'].height);

       });
    
       resizeObserver.observe(document.getElementById("game"));
        console.log(room)
    }, [])
    
    // if (!store.io.room) return <Redirect to='/home' />
    
    return (
        <Container>     
            <GamePortion id="game">      
                    <Guessers gameHeight={gameHeight}/>
                    <Acting setActHeight={setActHeight} gameHeight={gameHeight} />
                    <GuessActions actHeight={actHeight} gameHeight={gameHeight}>

                    </GuessActions>
            </GamePortion>
        </Container>
    )
});

export default WhichWhat;
