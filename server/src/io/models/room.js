class Room {
    id = null;
    hostSocketId = null;
    players = [];

    // game = {
    //     type: 'WhichWhat',
    //     history: [{ socketId: 127012, text: 'fishing', correct: false, type: 'guess' }]
    // };

    constructor(id, host, hostSocketId) {
        this.hostSocketId = hostSocketId;
        this.id = id;
        this.players = [host]
    }
}

export default Room;