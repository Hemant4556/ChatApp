import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const userSocketMap = {}; // {userId -> socketId}

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`User connected: ${userId}`);
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  } else {
    console.error("A connection was made without a valid userId");
  }

  socket.on("disconnect", () => {
    if (userId) {
      delete userSocketMap[userId];
      console.log(`User disconnected: ${userId}`);
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
});

export { app, io, server };
