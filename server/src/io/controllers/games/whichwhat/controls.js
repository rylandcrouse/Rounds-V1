import { promisify } from 'util';
import words from './words.js';


export const guess = async (io, socket, redis, action) => {
    const getRedis = promisify(redis.get).bind(redis);

    const roomFromRedis = await getRedis(action.roomId);
    const roomParsed = await JSON.parse(roomFromRedis);
    console.log('handling guess');

    const timeRef = Date.now();

    const currentGame = roomParsed.game;
    if (action.text.toLowerCase() === currentGame.turn.word.toLowerCase()) {
        // word correct

        
        currentGame.turn.guessed.push(socket.id);

        const msTimeLeft = currentGame.turn.endTime - timeRef
        const msTimeTurn = 45000
        const maxPointsGuesser = 1000
        const guesserPoints = Math.round(msTimeLeft * maxPointsGuesser / msTimeTurn)
        console.log(currentGame.playerStates[socket.id].score)
        currentGame.playerStates[socket.id].score += guesserPoints
        console.log(currentGame.playerStates[socket.id].score)


        const maxPtsPerGuesserActor = 1000 / (Object.keys(currentGame.playerStates).length - 1)
        const actingPoints = Math.round(msTimeLeft * maxPtsPerGuesserActor / msTimeTurn)
        console.log(currentGame.playerStates[socket.id].score)
        currentGame.playerStates[currentGame.turn.player].score += actingPoints
        console.log(currentGame.playerStates[socket.id].score)

    
        roomParsed.game = currentGame
        const strRoom = JSON.stringify(roomParsed);
        redis.set(roomParsed.id, strRoom);
        io.to(roomParsed.id).emit('game_update', currentGame)

        if (roomParsed.players.length === currentGame.turn.guessed.length -1) {
            return next(io, socket, redis, action);
        }

    }


}


export const endGame = async (io, socket, redis, action) => {
    const getRedis = promisify(redis.get).bind(redis);

    const roomFromRedis = await getRedis(action.roomId);
    const roomParsed = await JSON.parse(roomFromRedis);
    console.log('game ending')

    io.to(roomParsed.id).emit('game_update', null)

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
    
    
    if ((arePartialRoundsLeft && areTurnsLeft) || !arePartialRoundsLeft && areTurnsLeft) {
        const playerKeys = Object.keys(currentGame.playerStates)
        const nextTurn = {
            player: playerKeys[playerKeys.indexOf(currentGame.turn.player) + 1],
            startTime: timeRef + 5000,
            // 45 seconds to act
            endTime: timeRef + 50000,
            word: words[Math.floor(Math.random() * words.length)],
            guessed: 0
        }
        const updatedGame = {
            ...currentGame,
            turn: nextTurn
        }
        roomParsed.game = updatedGame
        const strRoom = JSON.stringify(roomParsed)
        redis.set(roomParsed.id, strRoom)
        console.log('new players turn ' + nextTurn.player)
        io.to(roomParsed.id).emit('game_update', updatedGame);
        console.log('Next turn socketId is ' + nextTurn.player)
    }

    if (arePartialRoundsLeft && !areTurnsLeft) {

        const playerKeys = Object.keys(currentGame.playerStates)
        const nextTurn = {
            player: playerKeys[0],
            startTime: timeRef + 5000,
            // 45 seconds to act
            endTime: timeRef + 60000,
            word: words[Math.floor(Math.random() * words.length)],
            guessed: 0
        }
        currentGame.currentIter++;
        const updatedGame = {
            ...currentGame,
            currentIter: currentGame.currentIter + 1,
            turn: nextTurn
        }
        roomParsed.game = updatedGame
        const strRoom = JSON.stringify(roomParsed)
        redis.set(roomParsed.id, strRoom)
        console.log('new players turn ' + nextTurn.player)
        io.to(roomParsed.id).emit('game_update', updatedGame);
        console.log('Next turn socketId is ' + nextTurn.player)
    }
}