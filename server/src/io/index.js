import { Server } from "socket.io";
import redis from "redis";
import config from "./../config.js";
import { createAdapter } from "socket.io-redis";
import auth from "./middleware/auth.js";
import { nanoid } from 'nanoid'

import { createRoom, joinRoom, sendOffer, sendAnswer } from './controllers/navigate.js';


export const pubClient = redis.createClient(config.REDIS.port, config.REDIS.host, { auth_pass: config.REDIS.password });
const subClient = pubClient.duplicate();


// Initialize socket.io on server
const ioify = (server) => {
    server.timeout = 0;
    const io = new Server(server, {
        cors: {
            origin: '*',
        },
        serveClient: false
    });
    // const pubClient = redis.createClient(config.REDIS.port, config.REDIS.host, { auth_pass: config.REDIS.password });
    // const subClient = pubClient.duplicate();
    io.adapter(createAdapter({ pubClient, subClient }));
    io.use(auth);
    io.on('connection', async (socket) => {
        console.log(`Connection from socket ${socket.id}!`);

        socket.on('join_room', (room) => joinRoom(io, socket, pubClient, room));
        socket.on('create_room', () => createRoom(io, socket, pubClient));

        socket.on('offer', (socketIdToCall, offer) => sendOffer(io, socket, pubClient, socketIdToCall, offer))
        socket.on('answer', (socketIdToAnswer, offer) => sendAnswer(io, socket, pubClient, socketIdToAnswer, offer))

    });
    console.log('Attaching IO...');
    return io;
}

export default ioify;
