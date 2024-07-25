const EventEmitter = require('events');
require('dotenv').config();

const event = new EventEmitter();

event.on('modules-loaded', () => {
    // Start the server and connect to the database after all modules have loaded
    event.emit('start-server', process.env.PORT);
    event.emit('connect-database', process.env.MONGO_URI);

})


event.ready = () => {
    // Load all modules after the event emitter is ready
    const server = require('../lib/server.js')(event);
    require('../lib/socket.js')(event, server);
    require('../sockets/api.socket.js')(event);
    require('../sockets/cg.socket.js')(event);
    require('../lib/database.js')(event);

    event.emit('modules-loaded');
}

module.exports = event;