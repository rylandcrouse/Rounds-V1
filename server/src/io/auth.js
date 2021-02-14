import jwt from 'jsonwebtoken';
import config from "./../config.js";


const auth = (socket, next) => {
    console.log('io middlewre')
    if (socket.handshake.query && socket.handshake.query.token) {
        try {
            console.log(socket.handshake.query.token)
            const user = jwt.verify(socket.handshake.query.token, config.JWT.ACCESS_SECRET);
            console.log(user)
            if (user) next();
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