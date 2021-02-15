import { makeAutoObservable } from "mobx"
import io from 'socket.io-client';
import api from './../utils/api/index'

class Instance {
    socket = null;

    room = null;

    constructor() {
        makeAutoObservable(this);
    }

    connect = () => {
        this.socket = io.connect(`http://localhost:${process.env.PORT || 8080}`, {
            query: {
                token: api.auth.getAccessToken()
                // token: api.auth.getAccessToken()
            }
        })
        console.log(this.io);
        console.log(`Connecting socket...`);
    }

    openRoom = () => {
        this.socket.emit('open_room');
    }

    joinRoom = (room) => {
        this.socket.emit('join_room', room);
    }
}

export default Instance;