import { makeAutoObservable } from "mobx"
import io from 'socket.io-client';
import api from './../utils/api/index'

class Instance {
    socket = null;

    room = null;

    status = {
        join: {
            loading: false,
            success: false
        },
        create: {
            loading: false,
            success: false
        }
    }

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
        this.socket.on('join_success', (answer) => {
            console.log(answer);
            this.status.join.loading = false;
        })
        this.socket.on('create_success', (answer) => {
            console.log(answer);
            this.status.create.loading = false;
        })
    }

    joinRoom = (room) => {
        this.status.join.loading = true;
        this.socket.emit('join_room', room);
    }

    createRoom = () => {
        this.status.create.loading = true;
        this.socket.emit('create_room');
    }
}

export default Instance;