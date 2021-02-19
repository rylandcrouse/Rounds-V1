import jwt from 'jsonwebtoken';
import config from "../../config.js";
import { pubClient } from '../index.js'


const auth = async (socket, next) => {
    // console.log('io middlewre')
    if (socket.handshake.query && socket.handshake.query.token) {
        try {
            // console.log(socket.handshake.query.token)
            const user = jwt.verify(socket.handshake.query.token, config.JWT.ACCESS_SECRET);
            const userInfoForRedis = JSON.stringify({ socketId: socket.id, _id: user.userId, display_name: user.display_name });
            // console.log(user)
            if (user) {
                pubClient.set(`socket_${socket.id}`, `user_${user.userId}`);
                pubClient.set(`user_${user.userId}`, userInfoForRedis);
                next();
            }
            else next(new Error('Authentication error'));
        } catch (err) {
            next(new Error('Authentication error'))
        }
    }
    else {
        next(new Error('Authentication error'));
    }
}

export default auth;
