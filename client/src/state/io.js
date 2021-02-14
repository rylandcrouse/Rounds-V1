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
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJ5bGFuZGNyb3VzZUBnbWFpbC5jb20iLCJ1c2VySWQiOiI2MDE2MzI3MTZkNTc0ODE2Zjk4ZDUyMWEiLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNjEzMjYxNDAxLCJleHAiOjE2MTMyNjMyMDF9.Hi65u6r_QI6gbTxEH2REcU2TgG3dXpcg3VwKii9IAlI'
                // token: api.auth.getAccessToken()
            }
        })
        console.log(connection);
        console.log(`Connecting socket...`);
    }
}

export default Instance;