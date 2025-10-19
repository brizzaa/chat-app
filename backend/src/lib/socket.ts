import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export function getReceiverSocketId(userId: any) {
  return userSocketMap[userId];
}

// per salvare gli utenti
const userSocketMap: { [key: string]: string } = {};

io.on("connection", (socket) => {
  console.log("user connected with id: " + socket.id);

  const userId = socket.handshake.query.userId;

  if (userId && typeof userId === "string") {
    userSocketMap[userId] = socket.id;
  }

  // emit serve per mandare gli eventi a tutti i clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected with id: " + socket.id);
    delete userSocketMap[userId as string];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
