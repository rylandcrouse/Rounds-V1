import { makeAutoObservable, runInAction } from "mobx"
import io from 'socket.io-client';
import api from './../utils/api/index'
import { getStream, } from './media';
import Peer from 'peerjs';
import auth from './auth/auth'
import config from './../utils/config';
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] };

let peer;


class Instance {
    getUserMedia = async () => await navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;


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
        if (this.socket) return;
        this.socket = await io.connect(`http://${config.io.host}:${config.io.port}`, {
            query: {
                token: api.auth.getAccessToken()
            }
        })
        this.socket.on('game_update', (gameState) => {
            runInAction(() => {
                this.room.game = gameState;

            })
        })
        this.socket.on('user_left', ({ userSocketId, newRoomState }) => {
            runInAction(()=> {
                delete this.streams[userSocketId];
                delete this.calls[userSocketId];
                this.room = newRoomState;
            })
        })
        this.socket.on('connect', () => {
            peer = new Peer(this.socket.id);
            peer.on('call', (call) => {
                getUserMedia({
                    video: {
                        width: 1280,
                        height: 720
                    }, audio: true
                }, (stream) => {
                    call.answer(stream); // Answer the call with an A/V stream.
                    call.on('stream', (remoteStream) => {
                        runInAction(() => {
                            this.streams[call.peer] = remoteStream
                        })
                        // Show stream in some video/canvas element.
                    });
                }, function (err) {
                });
            });
        });
        this.socket.on('FORCED_DISCONNECT', () => {
            auth.signOut();
            this.socket.disconnect();
        })
        this.socket.on('join_success', ({ roomState }) => {
            runInAction(() => {
                this.room = roomState;
                this.status.join.loading = false;
            })
            this.initMedia();
        })
        this.socket.on('create_success', (room) => {
            runInAction(() => {
                this.room = room;
                this.status.create.loading = false;
            })
            this.initMedia();
        })
        this.socket.on('user_joined', ({ userSocketId, roomState }) => {
            runInAction(() => {
                this.room = roomState;
            })
            if (userSocketId !== this.socket.id) {
                this.callPeer(userSocketId)
            }
        })

    }

    handleLeave = () => {
        if (window.stream) { window.stream.getTracks().forEach(function (track) { track.stop(); }); }
        this.socket.emit('leaving')
        this.media.getTracks().forEach(track => track.stop());
        this.streams[this.socket.id].getTracks().forEach(track => track.stop());
        for (let key in this.streams) {
            delete this.streams[key]
            if (key !== this.socket.id) {
                delete this.calls[key]
                peer.connections[key][0].peerConnection.close()
            }
        }
        this.media = null;
        this.room = null;
    }

    addCallListener = () => {
        this.peer.once('call', async (call) => {

            call.answer(this.media); // Answer the call with an A/V stream.
            call.on('stream', (remoteStream) => {
                // Show stream in some video/canvas element.
            });
        })
    }

    callPeer = async (socketId) => {
        getUserMedia({
            video: {
                width: 1280,
                height: 720
            },
            audio: true
        }, (stream) => {
            this.calls[socketId] = peer.call(socketId, stream);
            this.calls[socketId].on('stream', (remoteStream) => {
                // Show stream in some video/canvas element.
                this.streams[socketId] = remoteStream
            });
        }, function (err) {
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
    }

    start = (gametype) => {
        this.socket.emit('action', {
            roomId: this.room.id,
            gametype: gametype,
            action: 'start',
        })
    }

    guess = (text) => {
        this.socket.emit('action', {
            roomId: this.room.id,
            gametype: this.room.game.gametype,
            action: 'guess',
            text
        })
    }

    passTurn = () => {
        this.socket.emit('action', {
            roomId: this.room.id,
            gametype: this.room.game.gametype,
            action: 'next',
        });
    }
}

export default new Instance();