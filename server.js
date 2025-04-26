const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname)); // Serve the index.html

io.on('connection', (socket) => {
  socket.on('move', (data) => socket.broadcast.emit('move', data));
  socket.on('timeout', () => socket.broadcast.emit('turn', null));
  socket.on('chat', (msg) => io.emit('chat', msg));
  socket.on('name', (name) => io.emit('name', name));
  socket.on('restart', () => io.emit('restart'));
});

server.listen(process.env.PORT || 3000, () => console.log('Server running!'));
