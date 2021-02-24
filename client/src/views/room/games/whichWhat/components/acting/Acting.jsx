import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef } from 'react'
import { context } from '../../../../../../index';
import Video from '../../../../components/video/video';
import { ActingBox } from './styled';
import { ResizeObserver } from 'resize-observer';


const Acting = observer(({setActHeight, gameHeight}) => {
    const store = useContext(context);
    const room = store.io.room;
    const videoRef = useRef();

    
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            // console.log(entries);
            setActHeight(videoRef.current.children[0].clientHeight)
            console.log(videoRef.current.children[0].clientHeight)
        });
        // if (videoRef.current) return resizeObserver.observe(videoRef.current);
        // console.log(room)
    }, [])
    
    return (
        <ActingBox ref={videoRef} id="actingBox" gameHeight={gameHeight} key={store.io.socket.id}>
            { store.io.socket.id && <Video className="acting" id={store.io.socket.id} key={store.io.socket.id} /> }
        </ActingBox>
    )
});

export default Acting;