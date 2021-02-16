class Room {
    id = null;
    hostSocket = null;
    players = [];

    constructor(id, hostSocket, host) {
        this.hostId = host;
        this.id = id;
        this.players = [host]
        this.hostSocket = hostSocket;
    }
}

export default Room;