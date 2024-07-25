const _io = require('socket.io');

module.exports = function (event, httpServer) {

    const io = _io(httpServer, {
        cors: {
            origin: '*',
        }
    });

    // Listen for the get-io event and return the io object
    event.on('get-io', function (callback) {
        if (typeof callback === 'function') {
            callback(io);
        }
    });

    // Send all socket events to the default event handler
    io.of('/').on('connection', function (socket) {
        event.emit('default-connection', socket, io.of('/'));
    });

    // Send all socket events to the cg event handler
    io.of('/cg').on('connection', function (socket) {
        event.emit('cg-connection', socket, io.of('/cg'));
    });

    return io;
}