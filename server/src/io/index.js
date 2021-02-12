import {Server} from "socket.io";
import redis from "redis";
import config from "./../config.js";
import {createAdapter} from "socket.io-redis";


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
    io.on('connection', async (socket) => {
        console.log(`Connection from socket ${socket.id}!`);
        // await socket.join('blue');
        const rooms = await io.of('/').adapter.rooms;
        // console.log(rooms.get('blue'));
    });

    console.log('Attaching IO...');
    return io;
}

 export default ioify;