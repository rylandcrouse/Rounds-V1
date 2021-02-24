import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef } from 'react'
import { context } from '../../../../../../../index';
import Video from '../../../../../components/video/video';
import { GuessItemBox } from './styled';


const GuessItem = observer(({guess}) => {
    const store = useContext(context);
    const room = store.io.room;
    // const videoRef = useRef(null);
    useEffect(() => {
        console.log('******')
    }, [])
    
    
    return (
        <GuessItemBox>
            hello
        </GuessItemBox>
    )
});

export default GuessItem;