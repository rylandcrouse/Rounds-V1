import { nanoid } from 'nanoid';
import mongoose from 'mongoose';
import Room from './../models/room.js';
import getFromRedis from './helpers/getFromRedis.js'


import userRef from '../../authentication/models/user.js'
import user from '../../authentication/models/user.js';


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
            redis.set(roomId, JSON.stringify(newRoom))
            io.to(socket.id).emit('create_success', newRoom);
        })
    } catch (error) {
        return io.to(socket.id).emit('user_error');
    }
};

export const joinRoom = async (io, socket, redis, room) => {

    console.log('room to get from redis ' + room)

    ////////////////////1////////////////////
    await redis.get(room, async (err, reply) => {
        if (err || !reply) return io.to(socket).emit('join_failure');

        const existingRoom = await JSON.parse(reply);

        console.log(existingRoom)

        const socket_alias = `socket_${socket.id}`
        console.log(socket_alias)

        /////////////////2//////////////////
        await redis.get(socket_alias, async (err, userKeyFromSocketId) => {
            if (err) return io.to(socket).emit('join_failure');
            console.log(typeof userKeyFromSocketId)

            console.log(userKeyFromSocketId)
            /////////////////3//////////////////
            await redis.get(userKeyFromSocketId, async (err, userObjectFromUserId) => {
                if (err) return io.to(socket).emit('join_failure');
                const parsedUser = await JSON.parse(userObjectFromUserId)
                if (!parsedUser) return io.to(socket).emit('join_failure');


                let alteredRoom = { ...existingRoom };
                console.log('altered room =' + alteredRoom)
                alteredRoom.players.push(parsedUser);


                alteredRoom = JSON.stringify(alteredRoom);

                redis.set(room, alteredRoom);


                await redis.get(room, async (err, newRoomFromRedis) => {
                    if (err) return io.to(socket).emit('join_failure');

                    const parsedRoom = await JSON.parse(newRoomFromRedis);
                    console.log(parsedRoom)
                    if (!parsedRoom.players.find(player => player.socketId === socket.id)) return io.to(socket.id).emit('join_failure');
                    socket.join(room);
                    const clients = io.sockets.adapter.rooms.get(room);
                    if (!clients.has(socket.id)) {
                        redis.set(room, existingRoom)
                    }
                    io.to(room).emit('user_joined', { userSocketId: socket.id, roomState: parsedRoom });
                    io.to(socket.id).emit('join_success', { roomState: parsedRoom });

                })


                console.log(parsedUser)
            })
            /////////////////3//////////////////

        })
        /////////////////2//////////////////


    })
    /////////////////1//////////////////



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