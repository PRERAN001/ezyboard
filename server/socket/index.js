const { Server } = require("socket.io");
const registerSocketHandlers = require("./handler");

let io;

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`✅ User Connected: ${socket.id}`);

        registerSocketHandlers(io, socket);
    });

    return io;
}

function getIO() {
    if (!io) {
        throw new Error("Socket.io has not been initialized.");
    }

    return io;
}

module.exports = {
    initializeSocket,
    getIO,
};