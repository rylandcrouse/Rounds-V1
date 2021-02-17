import { nanoid } from 'nanoid';
import mongoose from 'mongoose';
import Room from './../models/room.js';


import userRef from '../../authentication/models/user.js'


export const createRoom = async (io, socket, redis) => {
    let roomId = nanoid(10);
    const getRoomById = (roomId) => {
        redis.get(roomId, (err, reply) => {
            return reply;
        })
    }
    while (getRoomById(roomId)) roomId = nanoid.generate(10);
    try {
        redis.get(`socket_${socket.id}`, async (err, reply) => {
            if (err || !reply) return io.to(socket.id).emit('user_error');
            console.log(reply)
            const hostId = reply.split('_')[1]
            const hostFromDB = await userRef.findOne({ '_id': hostId }, '_id display_name');
            console.log(hostFromDB)
            const newRoom = new Room(roomId, socket.id, hostFromDB);
            socket.join(roomId);
            const clients = io.sockets.adapter.rooms.get(roomId);
            if (clients.has(socket.id)) {
                console.log(clients)
                console.log(`${socket.id} created ${roomId}`)
            }
            io.to(socket.id).emit('create_success', newRoom);
        })
    } catch (error) {
        return io.to(socket.id).emit('user_error');
    }
};

export const joinRoom = (io, socket, redis, room) => {
    socket.join(room);
    const clients = io.sockets.adapter.rooms.get(room);
    if (clients.has(socket.id)) {
        console.log(clients)
        console.log(`${socket.id} joining ${room}`)
    }
    io.to(room).emit('user_joined', socket.id);
    io.to(socket.id).emit('join_success', `You joined room ${room}.`);
}

export const sendOffer = (io, socket, pubClient, socketIdToCall, offer) => {
    const call = { callerId: socket.id, offer };
    io.to(socketIdToCall).emit('call', call);
    console.log(`${socket.id} calling ${socketIdToCall}`)
}

export const sendAnswer = (io, socket, pubClient, socketIdToAnswer, offer) => {
    const answer = { callerId: socket.id, offer };
    io.to(socketIdToAnswer).emit('answer', answer);
    console.log(`${socket.id} answering ${socketIdToAnswer}`)
}