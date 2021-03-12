import { Redirect, Route as ROUTE } from 'react-router-dom';
import {context} from './../index';
import { useContext } from 'react';

// interface Props extends RouteProps {
//     auth?: boolean,
//     noauth?: boolean,
//     premium?: boolean,
//     Component: React.FunctionComponent<any>,
// }

const Route = ({
    auth,
    noauth,
    premium,
    Component,
    // spread props that were meant for react-router Route onto the ROUTE(s)
    ...rest
}) => {
    // Be sure that a component was provided to render, else throw an error.
    if (!Component) {
        throw new Error('No component given to render in "Route".');
    }

    // Get the email from the user state.
    // If an email is given we can conclude thet the client is authenticated.
    const store = useContext(context)
    const user = store.auth.user;

    // if the "noauth" decorator is present and the client is authenticated,
    // redirect to the "/" route
    if (noauth && user) {
        return (
            <ROUTE
                {...rest}
                render={() => <Redirect to="/home" />}
            />
        )
    }

    // if the "auth" decorator is present and the client is NOT authenticated,
    // redirect to the "/" route
    if (auth && !user) {
        return (
            <ROUTE
                {...rest}
                render={() => <Redirect to="/login" />}
            />
        )
    }

    // If the auth decorator is not present or is present, but the user is authenticated, return allow access
    if (!auth || (auth && user)) {
        return (
            <ROUTE
                {...rest}
                render={(props) => <Component {...props} />}
            />
        );
    }

    // TODO: Add instructions for premium route guarding

    // If no route guard clauses have applied we can assume this is a neutral route
    return (
        <ROUTE {...rest} render={(props) => <Component {...props} />} />
    )
}

export default Route