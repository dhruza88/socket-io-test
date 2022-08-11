const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

  io.on("connection", socket => {
    socket.join("some room");
  });

  io.on("connection", socket => {
    socket.on("private message", (anotherSocketId, msg) => {
      socket.to(anotherSocketId).emit("private message", socket.id, msg);
    });
  });

//   io.on('connection', (socket) => {
//     socket.broadcast.emit('chat message', (msg) => {
//         io.emit('chat message', msg)
//     });
//   });
server.listen(3000, () => {
  console.log('listening on *:3000');
});