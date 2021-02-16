import React, {useContext} from 'react'
import { Container, Button, RoomInput } from '../styled';
import useInput from './../../../utils/hooks/useInput';
import { observer } from 'mobx-react-lite';
import { context } from '../../../index';



const JoinFocused = observer(() => {
    const [input, setInput, clearInput] = useInput({ roomId: '' })

    const store = useContext(context);

    const handleJoin = () => {
        store.io.joinRoom(input.roomId);
        clearInput();
        console.log('handling join...')
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleJoin();
        }
    }

    return (
        <>
            <Button variant='dark' >Join</Button>
            <RoomInput onKeyPress={(e)=>handleEnter(e)} name='roomId' value={input.roomId} onChange={(e) => setInput(e)}/>
        </>
    )
});

export default JoinFocused
