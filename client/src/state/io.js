import { makeAutoObservable, runInAction } from "mobx"
import io from 'socket.io-client';
import api from './../utils/api/index'
import { getStream, } from './media';
import Peer from 'peerjs';


class Instance {
    socket = null;

    peer;

    media = null;

    streams = {};

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
                // token: api.auth.getAccessToken()
            }
        })
        // this.peer = new Peer(this.socket.id, {
        //     config: this.config
        // })
        // console.log(this.peer)
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
            this.streams[userId] = userId
            // if (userId !== this.socket.id) {
            //     this.makeCall(userId)
            // }
            // this.peerCall(userId)
        })
        // this.socket.on('call', async call => {
        //     this.peerConnections[call['callerId']] = new RTCPeerConnection(this.configuration);
            
        //     console.log(call)
        //     console.log(`Recieved call from ${call['callerId']} \n call`)
        //     if (call.offer) {
        //         this.peerConnections[call['callerId']].setRemoteDescription(new RTCSessionDescription(call.offer));
        //         const answer = await this.peerConnections[call['callerId']].createAnswer();
        //         await this.peerConnections[call['callerId']].setLocalDescription(answer);
        //         this.socket.emit('answer', call['callerId'], answer);
        //         await this.addStreamAndListeners(call['callerId']);

        //         const localStream = await getStream();
        //         localStream.getTracks().forEach(track => {
        //             this.peerConnections[call['callerId']].addTrack(track, localStream);
        //         });
        //     }
        // });
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
        // this.peer = new Peer(this.socket.id, {
        //     config: this.config
        // })
        this.peer = new Peer(this.socket.id)
        console.log(this.peer)
        this.peer.on('call', (call) => {
            console.log('incoming call')
            console.log(call);
            // const stream = 
            navigator.mediaDevices.getUserMedia({video: true, audio: true}, (stream) => {
              call.answer(stream); // Answer the call with an A/V stream.
              call.on('stream', (remoteStream) => {
                // Show stream in some <video> element.
                runInAction(() => {
                    this.streams[call.peer] = remoteStream    
                })
              });
            }, (err) => {
              console.error('Failed to get local stream', err);
            });
          });
        const stream = await getStream(); 
        // console.log(stream.getVideoTracks()) 
        runInAction(() => {
            this.media = stream;
            this.streams[this.socket.id] = stream;
            // this.addMediaTracks(this.socket.id)
        })
        console.log(`My socket id is ${this.socket.id}`)
    }

    calls = {};
    peerStreams = {};

    // peerCall = async (socketIdToCall) => {
    //     console.log('need to call socket sljncnsd')
    //     const stream = await getStream();
    //     console.log('got stream')
    //     this.call = await this.peer.call(socketIdToCall, stream);
    //     console.log('this peer called')
    //     console.log(this.calls)
    //     runInAction(() => {
    //         this.call.once('stream', async (remoteStream) => {
    //             console.log('Calling thorugh peerjs')
    //                 // Show stream in some <video> element.
    //                 runInAction(() => {
    //                     this.streams[socketIdToCall] = remoteStream;
    //                     console.log(this.streams)
    //                 })
    //         });
    //     })
    //     console.log(this.call)
    //     // await navigator.mediaDevices.getUserMedia({video: true, audio: true}, async (stream) => {
    //     //     console.log('got stream')
    //     //     this.calls[socketIdToCall] = await this.call(socketIdToCall, stream);
    //     //     this.calls[socketIdToCall].on('stream', async (remoteStream) => {
    //     //     console.log('Calling thorugh peerjs')
    //     //       // Show stream in some <video> element.
    //     //       this.peerStreams[socketIdToCall] = await remoteStream;
    //     //     });
    //     //   }, (err) => {
    //     //     console.error('Failed to get local stream', err);
    //     //   });
    // }

    call;
    configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]};
    peerConnections = {};

    // makeCall = async (socketId) => {
    //     this.peerConnections[socketId] = new RTCPeerConnection(this.configuration);
    //     this.socket.on('answer', async answer => {
    //         if (answer['callerId'] === this.socket.id) return
    //         console.log(`Recieved answer from socket ${answer['calledId']} \n answer`)
    //         if (answer.offer) {
    //             const remoteDesc = new RTCSessionDescription(answer.offer);
    //             await this.peerConnections[answer['callerId']].setRemoteDescription(remoteDesc);
    //             const localStream = await getStream();
    //             localStream.getTracks().forEach(track => {
    //                 this.peerConnections[socketId].addTrack(track, localStream);
    //             });
    //             // console.log(this.peerConnections[answer['callerId']])
    //             // console.log(`Answered call from socket ${answer['callerId']}`)
    //             await this.addStreamAndListeners(answer['callerId']);
    //         }
    //     });
    //     const offer = await this.peerConnections[socketId].createOffer();
    //     await this.peerConnections[socketId].setLocalDescription(offer);
    //     console.log(`Calling socket ${socketId}`)
    //     this.socket.emit('offer', socketId, offer);
    // }

    // addMediaTracks = (id) => {
    //     console.log('***')
    //     console.log(this.media)
    //     console.log(Object.keys(this.streams))
    //     console.log(id)
    //     console.log(this.streams[id])
    //     console.log('***')

    //     if (id === this.socket.id) return
    //     // this.streams[this.socket.id].getTracks().forEach(async track => {
    //     //     this.peerConnections[id].addTrack(track, await getStream());
    //     // });
    // }

    // addStreamAndListeners = async (socketId) => {
    //     this.streams[socketId] = new MediaStream();
    //     this.addMediaTracks(socketId)
    //     this.peerConnections[socketId].addEventListener('track', async (event) => {
    //         this.streams[socketId].addTrack(event.track, socketId);
    //     });
    // }
}

export default Instance;