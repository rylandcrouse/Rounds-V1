import { makeAutoObservable } from "mobx"
import io from 'socket.io-client';
import api from './../utils/api/index'

class Instance {
    socket;

    constructor() {
        makeAutoObservable(this);
    }

    connect = () => {
        const connection = io.connect(`http://localhost:${process.env.PORT || 8080}`, {
            query: {
                token: api.auth.getAccessToken()
                // token: api.auth.getAccessToken()
            }
        })
        console.log(connection);
        console.log(`Connecting socket...`);
    }
}

export default Instance;