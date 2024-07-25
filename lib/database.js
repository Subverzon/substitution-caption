const mongoose = require('mongoose');

module.exports = (event) => {
    // Connect to the database after receiving the event
    event.on('connect-database', (uri) => {
        mongoose.connect(uri).then(() => {
            console.log('Database is connected');
        }).catch((err) => {
            console.error(err);
        });
    })
}