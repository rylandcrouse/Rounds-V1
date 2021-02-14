import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import Auth from '../../utils/api/auth';
import useInput from '../../utils/hooks/useInput';
import { Container, Formy } from "./styled";
import {context} from './../../index';
import {Redirect} from 'react-router-dom';


const Match = observer(() => {
    const store = useContext(context);

    const [form, setForm] = useInput({
        code: ''
    })

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            store.auth.login(form);
        }
    }

    // if success, go to 2FA step
    if (!store.auth.matchEmail) return <Redirect to='/login' />

    return (
        <Container>
            <Formy onKeyPress={e => handleEnter(e)}>
                <p>{store.auth.matchEmail}</p>
            <Formy.Group controlId="formBasicCode">
                    <Formy.Label>Email address</Formy.Label>
                    <Formy.Control name='code' value={form.code} onChange={e => setForm(e)} type="text" placeholder="Enter Two-Factor Code" />
                    <Formy.Text className="text-muted">

                    </Formy.Text>
                </Formy.Group>

            </Formy>
        </Container>
    )
})

export default Match
