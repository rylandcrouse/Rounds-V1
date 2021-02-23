import { Observer, observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef } from 'react'
import { Redirect } from 'react-router-dom';
import { context } from '../../../../index.js';
import Video from '../../components/video/video';
import { Container, GuessersContainer, LeftHalf} from './styled';


const WhichWhat = observer(() => {
    const store = useContext(context);
    const room = store.io.room;
    // const videoRef = useRef(null);
    useEffect(() => {
        console.log(room)
    }, [])
    
    // if (!store.io.room) return <Redirect to='/home' />
    
    return (
        <Container>     
                <LeftHalf>
                    <GuessersContainer>
                        {Object.keys(store.io.streams).map(id => <Video id={id} key={id} />)}
                        {Object.keys(store.io.streams).map(id => <Video id={id} key={id} />)}
                        {Object.keys(store.io.streams).map(id => <Video id={id} key={id} />)}
                        {Object.keys(store.io.streams).map(id => <Video id={id} key={id} />)}
                        {Object.keys(store.io.streams).map(id => <Video id={id} key={id} />)}

                        {Object.keys(store.io.streams).map(id => <Video id={id} key={id} />)}
                        {Object.keys(store.io.streams).map(id => <Video id={id} key={id} />)}
                    </GuessersContainer>
                </LeftHalf> 
                <LeftHalf></LeftHalf> 
        </Container>
    )
});

export default WhichWhat;
