require("dotenv").config();

const express = require("express");

const http = require("http");

const { initializeSocket } = require("./socket");

const app = express();


const server = http.createServer(app);

initializeSocket(server);

app.get("/", (req, res) => {
    res.send("Server Running");
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});