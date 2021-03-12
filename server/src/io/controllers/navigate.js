import { nanoid } from 'nanoid';
import Room from './../models/room.js';
import { promisify } from 'util';
import games from './games/index.js'


export const createRoom = async (io, socket, redis) => {
    let roomId = nanoid(10);
    const getRoomById = (roomId) => {
        redis.get(roomId, (err, reply) => {
            return reply;
        })
    }
    while (getRoomById(roomId)) roomId = nanoid.generate(10);
    try {
        redis.get(`socket_${socket.id}`, async (err, hostId) => {
            if (err || !hostId) return io.to(socket.id).emit('user_error');
            // const hostId = reply.split('_')[1]
            await redis.get(hostId, async (err, hostUserInfo) => {
                if (err || !hostUserInfo) return io.to(socket.id).emit('user_error');

                const parsedHost = JSON.parse(hostUserInfo)


                const newRoom = new Room(roomId, parsedHost, socket.id);
                socket.join(roomId);
                const clients = io.sockets.adapter.rooms.get(roomId);
                if (clients.has(socket.id)) {
                    console.log(clients)
                    console.log(`${socket.id} created ${roomId}`)
                }
                parsedHost.currentRoom = roomId;
                const stringHost = JSON.stringify(parsedHost)
                redis.set(hostId, stringHost);
                redis.set(roomId, JSON.stringify(newRoom))
                io.to(socket.id).emit('create_success', newRoom);
            })
        })
    } catch (error) {
        return io.to(socket.id).emit('user_error');
    }
};

export const joinRoom = async (io, socket, redis, room) => {
    const redisExists = promisify(redis.exists).bind(redis);



    const exists = await redisExists(room)
    if (!exists) {
        return io.to(socket.id).emit('join_failure');
    }


    ////////////////////1////////////////////
    await redis.get(room, async (err, reply) => {
        if (err || !reply) return io.to(socket.id).emit('join_failure');

        const existingRoom = await JSON.parse(reply);

        const socket_alias = `socket_${socket.id}`

        /////////////////2//////////////////
        await redis.get(socket_alias, async (err, userKeyFromSocketId) => {
            if (err) return io.to(socket.id).emit('join_failure');
            console.log(typeof userKeyFromSocketId)

            console.log(userKeyFromSocketId)
            /////////////////3//////////////////
            await redis.get(userKeyFromSocketId, async (err, userObjectFromUserId) => {
                if (err) return io.to(socket).emit('join_failure');
                const parsedUser = await JSON.parse(userObjectFromUserId)
                if (!parsedUser) return io.to(socket.id).emit('join_failure');

                parsedUser.currentRoom = room;
                const updatedUser = JSON.stringify(parsedUser)
                await redis.set(userKeyFromSocketId, updatedUser)
                console.log(`SET USER ROOM TO ${room}`)

                let alteredRoom = { ...existingRoom };
                alteredRoom.players.push(parsedUser);
                alteredRoom = JSON.stringify(alteredRoom);
                redis.set(room, alteredRoom);


                await redis.get(room, async (err, newRoomFromRedis) => {
                    if (err) return io.to(socket.id).emit('join_failure');

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



    return


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

export const handleDisconnect = async (io, socket, redis) => {
    console.log(`handling disconnect for ${socket.id}`)
    await handleLeave(io, socket, redis);

}

export const handleLeave = async (io, socket, redis) => {
    console.log(`handling leave for ${socket.id}`)
    const redisGet = promisify(redis.get).bind(redis);

    const userIdFromSocketId = await redisGet(`socket_${socket.id}`)

    if (!userIdFromSocketId) return

    const userFromRedis = await redisGet(userIdFromSocketId);
    const userParsed = JSON.parse(userFromRedis)

    if (!userParsed || !userParsed.currentRoom) return

    const currentRoomState = await redisGet(userParsed.currentRoom)

    let parsedRoom = await JSON.parse(currentRoomState)

    
    socket.leave(parsedRoom.id);
    
    const newRoomState = {
        ...parsedRoom,
        players: parsedRoom.players.filter(player => player.socketId !== userParsed.socketId)
    }
    
    const newRoomStringified = JSON.stringify(newRoomState);
    
    redis.set(userParsed.currentRoom, newRoomStringified);

    if (parsedRoom.game) {
        games[parsedRoom.game.gametype].handleLeave(io, socket, redis, newRoomState)
    }
    
    io.to(userParsed.currentRoom).emit('user_left', { userSocketId: userParsed.socketId, newRoomState });
}