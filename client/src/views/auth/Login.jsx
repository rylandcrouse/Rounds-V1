import { observer } from 'mobx-react-lite';
import React, {useContext, useEffect} from 'react';
import Auth from '../../utils/api/auth';
import useInput from '../../utils/hooks/useInput';
import { Container, Formy, Groupet, Button, Inpoots, } from "./styled";
import {context} from './../../index';
import {Redirect} from 'react-router-dom';


const Login = observer(() => {
    const store = useContext(context);

    const [form, setForm] = useInput({
        email: '',
        password: ''
    })

    const handleSubmit = () => {
        store.auth.login(form);
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
        }
    }

    // if success, go to 2FA step
    if (store.auth.matchEmail) return <Redirect to='/match' />

    return (
        <Container>
                <Groupet>
                <svg style={{'margin': '1em'}} xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>

                </Groupet>
            <Formy onKeyPress={e => handleEnter(e)}>
            <Inpoots controlId="formBasicEmail">
                    <Formy.Label>Email address</Formy.Label>
                    <Formy.Control name='email' value={form.email} onChange={e => setForm(e)} type="email" placeholder="Enter email" />
                    <Formy.Text className="text-muted">

                    </Formy.Text>
                </Inpoots>

                <Inpoots controlId="formBasicPassword">
                    <Formy.Label>Password</Formy.Label>
                    <Formy.Control name='password' value={form.password} onChange={e => setForm(e)} type="password" placeholder="Password" />
                </Inpoots>
                <Groupet>
                    <Button onClick={() => handleSubmit()}>Login</Button>
                </Groupet>
            </Formy>
                <Groupet>
                <a href="/signup"> Create an account</a>

                </Groupet>
        </Container>
    )
})

export default Login
