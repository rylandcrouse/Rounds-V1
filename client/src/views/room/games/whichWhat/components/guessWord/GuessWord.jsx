import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, } from 'react'
import { context } from '../../../../../../index';
import Video from '../../../../components/video/video';
import { ActionBox, InputGuess, ActionHistory } from './styled';
import GuessItem from './components/GuessItem';
import {Form} from 'react-bootstrap'
import useInput from './../../../../../../utils/hooks/useInput'


const GuessActions = observer(({ gameHeight, actHeight }) => {
    const store = useContext(context);
    const room = store.io.room;
    const [input, setInput] = useInput({
        text: ''
    })
    // const videoRef = useRef(null);
    useEffect(() => {
        console.log('******')
    }, [])


    const handleEnter = (event) => {
        // console.log(input)
        if (event.key === 'Enter') {
            store.io.guess(input.text)
            console.log(input.text)
        }
    }


    return (
        <ActionBox actHeight={actHeight} gameHeight={gameHeight}>
            <ActionHistory>
                {
                    room.game.gameHistory.map(item => {
                        switch (item.type) {
                            case 'guess':
                                return <GuessItem action={item} key={Math.random()} />
                            default:
                                return null;
                        }
                    })
                }
            </ActionHistory>
                <InputGuess name='text' onKeyDown={(e) => handleEnter(e)} onChange={(e) => setInput(e)}/>
        </ActionBox>
    )
});

export default GuessActions;