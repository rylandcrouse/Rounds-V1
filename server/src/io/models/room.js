class Room {
    id = null;
    hostSocketId = null;
    players = [];

    constructor(id, host, hostSocketId) {
        this.hostSocketId = hostSocketId;
        this.id = id;
        this.players = [host]
    }
}

export default Room;