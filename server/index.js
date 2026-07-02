require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const http = require("http");

const { initializeSocket } = require("./socket");

const app = express();

mongoose
    .connect("mongodb://localhost:27017/ezyboard")
    .then(() => console.log("MongoDB Connected"))
    .catch(console.error);

const server = http.createServer(app);

initializeSocket(server);

app.get("/", (req, res) => {
    res.send("Server Running");
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});