import { nanoid } from 'nanoid'


export const createRoom = (io, socket, redis) => {
    const getRoomById = (roomId) => {
        redis.get(roomId, (err, reply) => {
            return reply;
        })
    }
    let roomId = nanoid(10);
    while (getRoomById(roomId)) roomId = nanoid.generate(10);
    socket.join(roomId);
    const clients = io.sockets.adapter.rooms.get(roomId);
    if (clients.has(socket.id)) {
        console.log(clients)
        console.log(`${socket.id} created ${roomId}`)
    }
    io.to(socket.id).emit('create_success', `You Created room ${roomId}.`);
}

export const joinRoom = (io, socket, redis, room) => {
    socket.join(room);
    const clients = io.sockets.adapter.rooms.get(room);
    if (clients.has(socket.id)) {
        console.log(clients)
        console.log(`${socket.id} joining ${room}`)
    }
    io.to(socket.id).emit('join_success', `You joined room ${room}.`);
}