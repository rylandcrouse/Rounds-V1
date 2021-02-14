import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './components/Route';

// Components to display in each route
import Welcome from './views/welcome/Welcome';
import Home from './views/Home';
// import LogIn from './views/welcome/Auth/LogIn';
// import Match from './views/welcome/Auth/Match';
// import SignUp from './views/welcome/Auth/SignUp';


// interface Props {

// }

const Routes = (props) => {
    return (
        <Switch>
            <Route path='/' noauth exact Component={Welcome} />

            {/* <Route path='/login' noauth exact Component={LogIn} />
            <Route path='/signup' noauth exact Component={SignUp} />
            <Route path='/match' noauth exact Component={Match} /> */}

            <Route path='/home' auth exact Component={Home} />


        </Switch>
    )
}

export default Routes