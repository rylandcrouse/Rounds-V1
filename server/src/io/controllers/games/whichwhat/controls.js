import { promisify } from 'util';
import words from './words.js';


export const endGame = async (io, socket, redis, action) => {
    const getRedis = promisify(redis.get).bind(redis);

    const roomFromRedis = await getRedis(action.roomId);
    const roomParsed = await JSON.parse(roomFromRedis);
    console.log('game ending')

}

export const next = async (io, socket, redis, action) => {
    const getRedis = promisify(redis.get).bind(redis);

    const roomFromRedis = await getRedis(action.roomId);
    const roomParsed = await JSON.parse(roomFromRedis);
    // console.log(roomParsed)
    const currentGame = roomParsed.game;

    const arePartialRoundsLeft = Boolean(currentGame.currentIter <= currentGame.maxRounds);
    const areTurnsLeft = Boolean(currentGame.turn.player !== Object.keys(currentGame.playerStates)[Object.keys(currentGame.playerStates).length - 1]);
    if (!arePartialRoundsLeft && !areTurnsLeft) {
        return endGame(io, socket, redis, action);
    }

    const timeRef = Date.now();


    if (arePartialRoundsLeft && areTurnsLeft) {
        const playerKeys = Object.keys(currentGame.playerStates)
        const nextTurn = {
            player: playerKeys[playerKeys.indexOf(currentGame.turn.player) + 1],
            startTime: timeRef + 5000,
            // 45 seconds to act
            endTime: timeRef + 1000,
            word: words[Math.floor(Math.random() * words.length)],
            guessed: 0
        }
        const updatedGame = {
            ...currentGame,
            turn: nextTurn
        }
        console.log('new players turn ' + nextTurn.player)
        io.to(roomParsed.id).emit('game_update', updatedGame);
        console.log('Next turn socketId is ' + nextTurn.player)
    }
}