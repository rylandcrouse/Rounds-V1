import { Server } from "socket.io";
import redis from "redis";
import config from "./../config.js";
import { createAdapter } from "socket.io-redis";
import auth from "./auth.js";
import { nanoid } from 'nanoid'


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

        socket.on('join_room', (room) => {
            socket.join(room);
            const clients = io.sockets.adapter.rooms.get(room);
            if (clients.has(socket.id)) {
                console.log(clients)
                console.log(`${socket.id} joining ${room}`)
            }
            io.to(socket.id).emit('join_success', `You joined room ${room}.`);
        })

        socket.on('create_room', () => {
            const getRoomById = (roomId) => {
                pubClient.get(roomId, (err, reply) => {
                    return reply;
                })
            }
            let roomId = nanoid.generate(10);
            while (getRoomById(roomId)) roomId = nanoid.generate(10);
            socket.join(room);
            const clients = io.sockets.adapter.rooms.get(room);
            if (clients.has(socket.id)) {
                console.log(clients)
                console.log(`${socket.id} created ${roomId}`)
            }
            io.to(socket.id).emit('join_success', `You joined room ${roomId}.`);
        })
    });
    console.log('Attaching IO...');
    return io;
}

export default ioify;
