import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import Auth from '../../utils/api/auth';
import useInput from '../../utils/hooks/useInput';
import { Container, Formy, Groupet, Inpoots, Button } from "./styled";
import {context} from './../../index';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';


const Match = observer(() => {
    const store = useContext(context);

    const [code, setCode] = useInput({code: ''})

    const handleSubmit = () => {
        store.auth.match({
            email: store.auth.matchEmail,
            code: code.code
        });
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
        }
    }

    // if success, go to 2FA step
    if (!store.auth.matchEmail) return <Redirect to='/login' />
    if (store.auth.user) return <Redirect to='/home' />


    return (
        <Container>
            <Formy onKeyPress={e => handleEnter(e)}>
                <Groupet controlId="formBasicCode">
                    <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" fill="currentColor" className="bi bi-envelope-open-fill" viewBox="0 0 16 16">
                        <path d="M8.941.435a2 2 0 0 0-1.882 0l-6 3.2A2 2 0 0 0 0 5.4v.313l6.709 3.933L8 8.928l1.291.717L16 5.715V5.4a2 2 0 0 0-1.059-1.765l-6-3.2zM16 6.873l-5.693 3.337L16 13.372v-6.5zm-.059 7.611L8 10.072.059 14.484A2 2 0 0 0 2 16h12a2 2 0 0 0 1.941-1.516zM0 13.373l5.693-3.163L0 6.873v6.5z"/>
                    </svg>
                </Groupet>
                <Groupet controlId="formBasicCode">
                    {store.auth.matchEmail && <small>({store.auth.matchEmail})</small>}
                </Groupet>

                <Inpoots controlId="formBasicCode">
                        <Formy.Control name='code' value={code.code} onChange={e => setCode(e)} type="text" placeholder="Enter Code..." />
                        <Formy.Text className="text-muted">

                        </Formy.Text>
                </Inpoots>
                <Groupet>
                    <Button>Login</Button>
                </Groupet>


            </Formy>
        </Container>
    )
})

export default Match
