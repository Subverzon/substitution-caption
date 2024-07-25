const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const path = require('path');

const apiRoute = require('../routes/api.route');
const cgRoute = require('../routes/cg.route');

let port = 8000;

function server(event) {
    app.use('/', express.static(path.join(__dirname, '../public')));
    app.use('/cg', express.static(path.join(__dirname, '../cg')));
    app.use('/', apiRoute);
    app.use('/cg', cgRoute);

    // Listen for the start-server event and start the server
    event.on('start-server', (PORT) => {
        PORT ? port = PORT : port = 8000;
        httpServer.listen(port, () => {
            console.log('Server is running on port ' + port);
            event.emit('update-renderer');
        });
    });

    // Listen for the stop-server event and stop the server
    event.on('stop-server', () => {
        httpServer.close();
    });

    // Listen for the get-port event and return the port
    event.on('get-port', (callback) => {
        callback(port);
    });

    return httpServer;
}

module.exports = server;