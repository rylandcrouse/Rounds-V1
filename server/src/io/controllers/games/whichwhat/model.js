import words from './words.js';

class WhichWhat {
    gametype = 'WhichWhat';
    colors = ['#ffa319', '#d8de26', '#25b04a', '#c90ff2', '#2b4fff'];
    turn = null;
    startTime = null;


    // everyone acts 3 times total
    maxRounds = 3;
    currentIter = 1;

    gameHistory = [
        { socketId: 127012, text: 'fishing', correct: false, type: 'guess' },
    ];

    playerStates = {

    };


    constructor(roomInstance) {
        // 15 seconds from now it will start
        // this.startTime = Math.round(new Date() / 1000) + 15000;

        const timeRef = Date.now();

        // ten second count down to game start
        this.startTime = timeRef + 10000;

        roomInstance.players.map(player => {
            this.playerStates[player.socketId] = {
                color: this.colors.pop(),
                score: 0,
                socketId: player.socketId
            }
        })
        console.log('&&&&&&&&&&&&&&')
        console.log(this.playerStates)
        console.log('&&&&&&&&&&&&&&')

        this.turn = {

            // 5 seconds between turns
            startTime: timeRef + 15000,
            player: Object.keys(this.playerStates)[0],
            // 45 seconds to act
            endTime: timeRef + 20000,
            word: words[Math.floor(Math.random() * words.length)],
            guessed: 0
        }
    }
}

export default WhichWhat;