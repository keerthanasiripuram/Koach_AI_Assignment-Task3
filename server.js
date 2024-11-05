const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); 

// Listen for client connections
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Listen for 'drawShape' event from clients
    socket.on('drawShape', (shapeData) => {
        // Broadcast the shape data to all other clients except the sender
        socket.broadcast.emit('newShape', shapeData);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

