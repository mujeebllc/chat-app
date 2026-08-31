import { Server } from "socket.io";
import http from "http";
import express from "express";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const redisUrl = process.env.REDIS_URI || "redis://localhost:6379";
export const pubClient = createClient({ url: redisUrl });
export const subClient = pubClient.duplicate();
export const stateClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect(), stateClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient));
  console.log("Connected to Redis and initialized Socket.IO adapter");
}).catch(err => {
  console.error("Redis connection error:", err);
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    socket.join(userId); // Join room named after userId for direct messaging
    
    stateClient.hIncrBy("onlineUsers", userId, 1).then(() => {
      stateClient.hKeys("onlineUsers").then(users => {
        io.emit("getOnlineUsers", users);
      });
    });
  }

  socket.on("disconnect", async () => {
    console.log("A user disconnected", socket.id);
    if (userId) {
      const count = await stateClient.hIncrBy("onlineUsers", userId, -1);
      if (count <= 0) {
        await stateClient.hDel("onlineUsers", userId);
      }
      const users = await stateClient.hKeys("onlineUsers");
      io.emit("getOnlineUsers", users);
    }
  });
});

export { io, app, server };
