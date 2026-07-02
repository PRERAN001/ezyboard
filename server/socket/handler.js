const registerRoomEvents = require("./events/rooms.events");
const EVENTS = require("./events/constants");
const boardManager = require("../managers/BoardManager");
const registerDrawingEvents = require("./events/drawing.events");
// const registerDrawingEvents = require("./events/drawing.events");
// const registerCursorEvents = require("./events/cursor.events");

function registerSocketHandlers(io, socket) {

    registerRoomEvents(io, socket);
    registerDrawingEvents(io,socket);

    // registerDrawingEvents(io, socket);
    // registerCursorEvents(io, socket);

    socket.on("disconnect", () => {

    if (!socket.boardId) return;

    const users = boardManager.leaveBoard(
        socket.boardId,
        socket.id
    );

    io.to(socket.boardId).emit(
        EVENTS.BOARD_USERS,
        users
    );

    console.log(`${socket.username} left`);

});
}

module.exports = registerSocketHandlers;