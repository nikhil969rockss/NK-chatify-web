import { Server } from "socket.io";
import http from "node:http";
import { ENV } from "./env";
import express from "express";
import { socketAuthMiddleware } from "../middlewares/socketAuth.middleware";
import app from "../app";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

const userSocketMap = new Map<string, any>(); // {userId: socketId}

io.on("connection", (socket: AuthSocket) => {
  console.log("A user connected", socket.user?.fullName);

  const userId = socket?.userId;

  userSocketMap.set(userId!, socket.id);

  // this will broadcast to all connected clients
  io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

  // listen events from the clients
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user?.fullName);
    userSocketMap.delete(userId!);
    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
  });
});

export { app, server, io };
