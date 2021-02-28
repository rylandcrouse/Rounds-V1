import { Server } from "socket.io";
import redis from "redis";
import config from "./../config.js";
import { createAdapter } from "socket.io-redis";
import auth from "./middleware/auth.js";
import { nanoid } from 'nanoid'

import games from './controllers/games/index.js'

import { createRoom, joinRoom, sendOffer, sendAnswer, handleDisconnect, handleLeave } from './controllers/navigate.js';

export const pubClient = redis.createClient(config.REDIS.port, config.REDIS.host, { auth_pass: config.REDIS.password });
const subClient = pubClient.duplicate();

// Initialize socket.io on server
const ioify = (server) => {
    console.log('ioifying')
    server.timeout = 0;
    const io = new Server(server, {
        cors: {
            origin: '*',
        },
        serveClient: false
    });
    // const pubClient = redis.createClient(config.REDIS.port, config.REDIS.host, { auth_pass: config.REDIS.password });
    // const subClient = pubClient.duplicate();
    // Object.keys(io.sockets.sockets.rooms).forEach(function (id) {
    //     console.log("ID:", id)  // socketId
    // })
    io.adapter(createAdapter({ pubClient, subClient }));
    const authHelper = (socket, next) => auth(socket, next, io)
    io.use(authHelper);
    const removeUser = (socketIdToRm) => {
        io.sockets.sockets.get(socketIdToRm).disconnect()
        console.log('removied' + socketIdToRm)
    }
    io.on('kill_old', () => {
        console.log('kill_old')
    })
    io.on('connection', async (socket) => {

        pubClient.get(`socket_${socket.id}`, async (err, userIdFromSocket) => {
            if (err) console.log('Error checking for user already online');
            console.log(userIdFromSocket)
            pubClient.get(userIdFromSocket, async (err, userFromRedis) => {
                if (err) console.log('Error checking for user already online');
                const parsedUser = await JSON.parse(userFromRedis)
                console.log(parsedUser)
                if (parsedUser && parsedUser.oldSocketId) io.to(parsedUser.oldSocketId).emit('FORCED_DISCONNECT')

            })
        })
        socket.emit('kill_old')

        socket.on('kill_old', () => {
            console.log('kill_old')
        })
        // console.log(io.sockets.sockets.get(socket.id))
        console.log(`Connection from socket ${socket.id}!`);

        socket.on('join_room', (room) => joinRoom(io, socket, pubClient, room));
        socket.on('create_room', () => createRoom(io, socket, pubClient));

        socket.on('offer', (socketIdToCall, offer) => sendOffer(io, socket, pubClient, socketIdToCall, offer))
        socket.on('answer', (socketIdToAnswer, offer) => sendAnswer(io, socket, pubClient, socketIdToAnswer, offer))

        socket.on('leaving', () => handleLeave(io, socket, pubClient));
        socket.on('disconnect', () => handleDisconnect(io, socket, pubClient));

        // socket.on('start_game', (gametype) => handleStartGame(io, socket, pubClient, gametype));
        // socket.on('start_game', (gametype) => games.WhichWhat.start(io, socket, pubClient, gametype))

        socket.on('action', (payload) => {
            console.log(payload['gametype'])
            console.log(payload)

        })
        socket.on('action', (payload) => games[payload['gametype']][payload['action']](io, socket, pubClient, payload))

    });
    console.log('Attaching IO...');
    return io;
}

export default ioify;
