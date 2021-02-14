import { Server } from "socket.io";
import redis from "redis";
import config from "./../config.js";
import { createAdapter } from "socket.io-redis";
import auth from "./auth.js";


// Initialize socket.io on server

const ioify = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
        },
        serveClient: false
    });
    const pubClient = redis.createClient(config.REDIS.port, config.REDIS.host, { auth_pass: config.REDIS.password });
    const subClient = pubClient.duplicate();
    io.adapter(createAdapter({ pubClient, subClient }));
    io.use(auth);
    io.on('connection', async (socket) => {
        console.log(`Connection from socket ${socket.id}!`);
        // pubClient.set('randomdninf', JSON.stringify([{ 'man': 'guy1' }]))
        // const result = pubClient.get('randomdninf', (err, reply) => {
        //     if (err) return console.log(err)

        //     // if (err) return socket.emit('join_err')
        //     if (reply) return console.log('guy' + reply);
        // });
        // console.log(result)
        // socket.join(room)
        socket.on('joinroom', (room) => {
            try {
                const existing = client.get(room);
                console.log(existing)
            } catch (err) {

            }
            socket.join(room)
        })
    });
    console.log('Attaching IO...');
    return io;
}

export default ioify;