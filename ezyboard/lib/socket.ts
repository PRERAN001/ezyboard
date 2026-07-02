"use client";

import { io } from "socket.io-client";

export const socket = io("https://ezyboard.onrender.com", {
  transports: ["websocket"],
  autoConnect: false,
});
