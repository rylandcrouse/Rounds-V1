import { observer } from 'mobx-react-lite';
import React, {useContext, useEffect, useRef, useState} from 'react'
import { Redirect } from 'react-router-dom';
import { context } from '../../../../index';
import Peer from 'peerjs';
import {getStream} from './../../../../state/media'


const Video = observer(({id}) => {
    const store = useContext(context);
    const videoRef = useRef();
    const [call, setCall] = useState()
    const [gotStream, setGotStream] = useState()
    const [num, setNum] = useState(0)

    const changeRef = (src) => {
        videoRef.current.srcObject = src
    }

    const makeCall = async () => {
        console.log(num)
        setNum(num + 1)
        if (id === store.io.socket.id) {
            setGotStream(true)
            console.log('own video')
            console.log(videoRef)
            changeRef(store.io.media)
    
        }
        console.log('make call called')
        // await setPeer(await new Peer(store.io.socket.id))
        const newCall = await store.io.peer.call(id, store.io.media);
        setCall(newCall)
        console.log(newCall);
        if (call) {
            call.on('stream', (remoteStream) => {
                console.log('answered')
                store.io.setStream(id, remoteStream)
                changeRef(remoteStream)
                setGotStream(true)
            })
        }
        // changeRef(store.streams[id]);
        console.log('calling')
    }

    // useEffect(() => {
    //     const makeCall = async () => {
    //         if (id === store.io.socket.id) {
    //             videoRef.current.srcObject = store.io.media
    //             return
    //         }
    //         console.log('make call called')
    //         // await setPeer(await new Peer(store.io.socket.id))
    //         setCall(store.io.peer.call(id, store.io.media));
    //         console.log(call);
    //         if (call) {
    //             call.on('stream', (remoteStream) => {
    //                 videoRef.current.srcObject = remoteStream;
    //             })
    //         }
    //         console.log('calling')
    //     }

    //     if (id === store.io.socket.id) {
    //         videoRef.current.srcObject = store.io.media
    //     } else {
    //         makeCall();
    //         if (call) {
    //             call.on('stream', (remoteStream) => {
    //                 videoRef.current.srcObject = remoteStream;
    //             })
    //         }
    //     }
    //     // videoRef.current.srcObject = store.io.streams[id]
    //     // // console.log(store.io.room.id)
    //     // // console.log(store.io.media)
    //     // console.log(store.io.streams[id])
    //     // setCall()

    // }, [store.io.room, id])

    // useEffect(() => {
    //     console.log(store.io.peer)
    // }, [store.io.peer])
    useEffect(() => {
        if (store.io.peer) makeCall();
        changeRef(store.io.media)
    }, [])


    return (
        <video ref={videoRef} autoPlay playsInline/>
    )
});

export default Video;
