
let app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

    io.on('connection', (socket) => {
        socket.on('message', (msg) => {
            io.emit('new message', msg);
        });
        socket.on('notification', (notif) => {
            io.emit('new notification', notif);
        });
    });

http.listen(3001, function () {
    console.log('listening on *:3001');
});