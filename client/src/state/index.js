import Auth from './auth/auth';
import io from './io';

const store = {
    io: new io(),
    auth: new Auth()
}

export default store;