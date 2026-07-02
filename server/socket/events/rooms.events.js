const EVENTS = require("./constants");
const boardManager = require("../../managers/BoardManager");

function registerRoomEvents(io, socket) {

    socket.on(EVENTS.JOIN_BOARD, ({ boardId, username }) => {

        if (!boardId || !username) return;

        socket.join(boardId);

        socket.boardId = boardId;
        socket.username = username;

        const users = boardManager.joinBoard(boardId, {
            socketId: socket.id,
            username,
        });

        io.to(boardId).emit(EVENTS.BOARD_USERS, users);

        console.log(`${username} joined ${boardId}`);

    });

}

module.exports = registerRoomEvents;