import jwt from 'jsonwebtoken';
import config from "../../config.js";
import { pubClient } from '../index.js';
// import { ioObj } from './../index'


const auth = async (socket, next, io) => {
    console.log('auth io middleware')
    // console.log(socket.adapter.sids)
    // console.log('io middlewre')
    const user = jwt.verify(socket.handshake.query.token, config.JWT.ACCESS_SECRET);
    if (!user) next(new Error('Authentication error'));
    if (socket.handshake.query && socket.handshake.query.token) {
        try {
            pubClient.get(`user_${user.userId}`, async (err, userFromRedis) => {
                if (err) console.log('Error checking for user already online');
                const parsedUFR = await JSON.parse(userFromRedis);
                console.log(parsedUFR)
                const newUserData = { socketId: socket.id, _id: user.userId, display_name: user.display_name }
                if (parsedUFR && parsedUFR.socketId) {
                    newUserData.oldSocketId = parsedUFR.socketId
                }
                const newUserDataStringified = JSON.stringify(newUserData);
                pubClient.set(`socket_${socket.id}`, `user_${user.userId}`);
                pubClient.set(`user_${user.userId}`, newUserDataStringified);
                next();

                // console.log(io.sockets.sockets.get(parsedUFR.socketId))
                // io.sockets.sockets.get(parsedUFR.socketId).disconnect()



                // console.log(io.sockets.sockets.get(parsedUFR.socketId))
            })
        } catch (err) {
            next(new Error('Authentication error'))
        }
    }
    else {
        next(new Error('Authentication error'));
    }
}

export default auth;
