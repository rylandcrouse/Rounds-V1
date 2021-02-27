import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef } from 'react'
import { context } from '../../../../../../index';
import Video from '../../../../components/video/video';
import { Banner, Overlay } from './styled';
// import { ResizeObserver } from 'resize-observer';


const Acting = observer(({ actingState }) => {
    const store = useContext(context);
    const room = store.io.room;

    useEffect(() => {
        console.log(actingState)
        return () => {
            return
        }
    }, [])

    return (
        <Overlay>
            <div>hello</div>
            <div>hello</div>
            {actingState && <Banner bg={actingState.color}>
                hello
            </Banner>}

        </Overlay>
    )
});

export default Acting;