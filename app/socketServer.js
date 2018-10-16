
let app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

    io.on('connection', function (socket) {
        socket.on('message', function (msg) {
            io.emit('new message', msg);
        });
        socket.on('notification', function (notif) {
            io.emit('new notification', notif);
        });
    });

http.listen(3001, function () {
    console.log('listening on *:3001');
});