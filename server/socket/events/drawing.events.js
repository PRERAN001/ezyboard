const EVENTS = require("./constants");

function registerDrawingEvents(io, socket) {

    socket.on(EVENTS.STROKE_START, (data) => {

        socket.to(data.boardId).emit(
            EVENTS.STROKE_START,
            data
        );

    });

    socket.on(EVENTS.STROKE_POINT, (data) => {

        socket.to(data.boardId).emit(
            EVENTS.STROKE_POINT,
            data
        );

    });

    socket.on(EVENTS.STROKE_END, (data) => {

        socket.to(data.boardId).emit(
            EVENTS.STROKE_END,
            data
        );

    });

}

module.exports = registerDrawingEvents;