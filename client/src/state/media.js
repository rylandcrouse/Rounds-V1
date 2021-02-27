import { makeAutoObservable, runInAction } from "mobx"
import io from 'socket.io-client';
import api from './../utils/api/index'


export const openMediaDevices = async (constraints) => {
    return await navigator.mediaDevices.getUserMedia(constraints);
}

export const getStream = async () => {
    try {
        const stream = await openMediaDevices({
            'video': {
                width: 1280,
                height: 720
            },
            'audio': {
                'echoCancellation': true,
                'noiseSuppression': true,
                'autoGainControl': true,
                'sampleRate': 48000
            },
        });
        console.log('Got MediaStream:', stream);
        return stream;
    } catch (error) {
        console.error('Error accessing media devices.', error);
    }
}



// class Media {
//     stream = null;

//     constructor() {
//         this.initStream();
//     }

//     init = () => {
//         try {
//             const stream = this.openMediaDevices({'video':true,'audio':true});
//             console.log('Got MediaStream:', stream);
//         } catch(error) {
//             console.error('Error accessing media devices.', error);
//         }
//     }

//     openMediaDevices = async (constraints) => {
//         return await navigator.mediaDevices.getUserMedia(constraints);
//     }
// }