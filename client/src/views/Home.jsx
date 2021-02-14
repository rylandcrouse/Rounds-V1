import React, {useMemo, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {context} from './../index';

const Home = observer(() => {
    const store = useContext(context);
    useMemo(() => store.io.connect(), []);

    return (
        <div>
            {store.auth.user.email}
        </div>
    )
});

export default Home
