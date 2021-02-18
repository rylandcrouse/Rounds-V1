import { makeAutoObservable, runInAction } from "mobx"
import io from 'socket.io-client';
import api from './../utils/api/index'
import { getStream, } from './media';
import Peer from 'peerjs';
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] };

let peer;


class Instance {
    getUserMedia = () => navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;


    socket = null;

    peer;

    media = null;

    streams = {};

    calls = {};

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

    connect = async () => {
        this.socket = await io.connect(`http://localhost:${process.env.PORT || 8080}`, {
            query: {
                token: api.auth.getAccessToken()
            }
        })
        this.socket.on('connect', () => {
            console.log('connected');
            peer = new Peer(this.socket.id);
            console.log(peer)
            peer.on('call', (call) => {
                console.log('GOT CALL')
                getUserMedia({ video: true, audio: true }, (stream) => {
                    call.answer(stream); // Answer the call with an A/V stream.
                    call.on('stream', (remoteStream) => {
                        console.log('GOT ANSWER')

                        console.log(call)
                        runInAction(() => {
                            this.streams[call.peer] = remoteStream
                        })
                        console.log(this.streams)
                        // Show stream in some video/canvas element.
                    });
                }, function (err) {
                    console.log('Failed to get local stream', err);
                });
            });
        });
        this.socket.on('join_success', (room) => {
            runInAction(() => {
                console.log(room);
                this.room = room;
                this.status.join.loading = false;
            })
            this.initMedia();
        })
        this.socket.on('create_success', (room) => {
            console.log(`Created room ${room.id}`);
            runInAction(() => {
                this.room = room;
                this.status.create.loading = false;
            })
            this.initMedia();
        })
        this.socket.on('user_joined', (userId) => {
            console.log(`${userId} joined.`)
            if (userId !== this.socket.id) {
                this.callPeer(userId)
            }
        })

    }

    addCallListener = () => {
        this.peer.once('call', async (call) => {
            console.log('recieving call')

            call.answer(this.media); // Answer the call with an A/V stream.
            call.on('stream', (remoteStream) => {
                // Show stream in some video/canvas element.
                console.log('REMOTE STREAM')
            });
        })
    }

    callPeer = async (socketId) => {
        console.log('THIS IS')
        console.log(this)
        // const call = await this.peer.call('another-peers-id', this.streams[this.socket.id]);
        // console.log(call)
        getUserMedia({ video: true, audio: true }, (stream) => {
            console.log(this)
            this.calls[socketId] = peer.call(socketId, stream);
            this.calls[socketId].on('stream', (remoteStream) => {
                // Show stream in some video/canvas element.
                this.streams[socketId] = remoteStream
                console.log(`CALLING ${socketId}`)
            });
        }, function (err) {
            console.log('Failed to get local stream', err);
        });
    }

    joinRoom = async (room) => {
        await this.initMedia()
        this.status.join.loading = true;
        this.socket.emit('join_room', room);
    }

    createRoom = () => {
        this.status.create.loading = true;
        this.socket.emit('create_room');
    }


    initMedia = async () => {
        const stream = await getStream();
        runInAction(() => {
            this.media = stream;
            this.streams[this.socket.id] = stream;
        })
        console.log(`My socket id is ${this.socket.id}`)
    }
}

export default Instance;