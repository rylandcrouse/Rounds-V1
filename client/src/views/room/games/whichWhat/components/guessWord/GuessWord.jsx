import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef } from 'react'
import { context } from '../../../../../../index';
import Video from '../../../../components/video/video';
import { ActionBox, InputGuess, ActionHistory } from './styled';
import GuessItem from './components/GuessItem';


const GuessActions = observer(({gameHeight, actHeight}) => {
    const store = useContext(context);
    const room = store.io.room;
    // const videoRef = useRef(null);
    useEffect(() => {
        console.log('******')
    }, [])
    
    
    return (
        <ActionBox actHeight={actHeight} gameHeight={gameHeight}>
            <ActionHistory>
                {
                    room.game.history.map(item => {
                        switch(item.type) {
                            case 'guess':
                                return <GuessItem/>
                            default:
                                return null;
                        }
                    })
                }
            </ActionHistory>
            <InputGuess/>
        </ActionBox>
    )
});

export default GuessActions;