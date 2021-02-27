import { promisify } from 'util';
import WhichWhat from './model.js';

export const start = async (io, socket, redis, action) => {
    const getRedis = promisify(redis.get).bind(redis);

    const roomFromRedis = await getRedis(action.roomId);
    const roomParsed = await JSON.parse(roomFromRedis);
    // console.log(roomParsed)

    const game = new WhichWhat(roomParsed);
    roomParsed.game = game;

    io.to(roomParsed.id).emit('game_update', game);

    const strRoom = JSON.stringify(roomParsed);
    redis.set(roomParsed.id, strRoom);
    console.log(roomParsed.game);
}