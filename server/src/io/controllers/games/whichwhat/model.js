import words from './words.js';

class WhichWhat {
    type = 'WhichWhat';
    colors = ['#c51111', '#132ed1', '#117f2d', '#ef7d0d', '#6g2fbb'];
    turn = null;
    startTime = null;


    // everyone acts 3 times total
    maxRounds = 3;
    currentIter = 1;

    gameHistory = [
        { socketId: 127012, text: 'fishing', correct: false, type: 'guess' },
    ];

    playerStates = [];


    constructor(roomInstance) {
        // 15 seconds from now it will start
        // this.startTime = Math.round(new Date() / 1000) + 15000;

        const timeRef = new Date();

        // ten second count down to game start
        this.startTime = timeRef + 10000;

        roomInstance.players.map(player => {
            this.playerStates.push({
                color: this.colors.pop(),
                score: 0,
                socketId: player.socketId
            })
        })

        this.turn = {

            // 5 seconds between turns
            startTime: timeRef + 15000,

            // 45 seconds to act
            endTime: new Date() + 60000,
            word: words[Math.floor(Math.random() * words.length)],
            guessed: 0
        }
    }
}

export default WhichWhat;