import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef } from 'react'
import { context } from '../../../../../../index';
import Video from '../../../../components/video/video';
import { GuessersBox, GuesserVidBox } from './styled';


const WhichWhat = observer(({gameHeight}) => {
    const store = useContext(context);
    const room = store.io.room;
    // const videoRef = useRef(null);
    useEffect(() => {
        console.log(room)
    }, [])
    
    
    return (
        <GuessersBox gameHeight={gameHeight}>
            {Object.keys(store.io.streams).map(id => <GuesserVidBox key={id}><Video id={id} key={id} /></GuesserVidBox>)}
            {Object.keys(store.io.streams).map(id => <GuesserVidBox key={id}><Video id={id} key={id} /></GuesserVidBox>)}

            </GuessersBox>
    )
});

export default WhichWhat;