import { makeAutoObservable, runInAction } from "mobx"
import io from 'socket.io-client';
import api from './../utils/api/index'
import { getStream } from './media';

class Instance {
    socket = null;

    media = null;

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
        this.socket.on('join_success', (room) => {
            runInAction(() => {
                console.log(room);
                this.room = room;
                this.status.join.loading = false;
            })
            this.initMedia();
        })
        this.socket.on('create_success', (room) => {
            console.log(room);
            runInAction(() => {
                this.room = room;
                this.status.create.loading = false;
            })
            this.initMedia();
        })
        this.socket.on('user_joined', (user) => {
            console.log(user)
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

    initMedia = async () => {
        const stream = await getStream(); 
        console.log(stream.getVideoTracks()) 
        runInAction(() => {
            this.media = stream
        })
    }
}

export default Instance;