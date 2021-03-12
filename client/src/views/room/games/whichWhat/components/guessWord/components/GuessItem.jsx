import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef } from 'react'
import { context } from '../../../../../../../index';
import Video from '../../../../../components/video/video';
import { GuessItemBox } from './styled';


const GuessItem = observer(({action}) => {
    const store = useContext(context);
    const room = store.io.room;
    // const videoRef = useRef(null);
    useEffect(() => {
        console.log('******')
    }, [])
    
    
    return (
        <GuessItemBox>
            {action.text}
        </GuessItemBox>
    )
});

export default GuessItem;