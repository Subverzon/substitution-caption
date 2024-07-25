const Config = require("../lib/config");

module.exports = (event) => {
    // Handle the cg connection and datalink event
    event.on('cg-connection', (socket) => {
        
        // Handle the datalink event and send the data to the cg
        event.on('datalink', (arg, response) => {
            socket.emit('datalink', {type: 'update', bundle: arg.bundle, page: arg.page, data: arg.data});
        });

        // Handle the read-data event and send the data to the cg
        socket.on('read-data', (arg, response) => {
            let data = Config.read(`datalink.${arg.bundle}-${arg.page}`);
            response({status: 'success', data: data});
        })
    });
}
