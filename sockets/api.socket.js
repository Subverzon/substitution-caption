const Master = require('../main/master');
const Config = require('../lib/config');

module.exports = (event) => {
    // Handle the default connection and the crud event
    event.on('default-connection', (socket) => {

        // Handle the crud event from data or cg panel
        socket.on('crud', (arg, response) => {
            socket.emit('loading', true);
            switch (arg.action) {
                case 'create':
                    Master.create(arg.model, arg.data)
                    .then(data => {
                        response({status: 'success', data: data});
                    }).catch(err => {
                        response({status: 'error', message: err});
                    });
                    break;
                case 'read':
                    Master.read(arg.model, arg.options, arg.selection, arg.population)
                    .then(data => {
                        response({status: 'success', data: data});
                    }).catch(err => {
                        response({status: 'error', message: err});
                    });
                    break;
                case 'update':
                    Master.update(arg.model, arg.id, arg.data)
                    .then(data => {
                        response({status: 'success', data: data});
                    }).catch(err => {
                        response({status: 'error', message: err});
                    });
                    break;
                case 'delete':
                    Master.delete(arg.model, arg.id)
                    .then(data => {
                        response({status: 'success', data: data});
                    }).catch(err => {
                        response({status: 'error', message: err});
                    });
                    break;
                default:
                    response({status: 'error', message: 'Invalid action'});
                    break;
            }
            socket.emit('loading', false);
        });

        // Handle the datalink event and update the data in the config
        socket.on('datalink', (arg, response) => {
            let data = {};
            switch (arg.action) {
                case 'update':
                    data = Config.write(`datalink.${arg.bundle}-${arg.page}`, arg.data)
                    break;
                case 'read':
                    data = Config.read(`datalink.${arg.bundle}-${arg.page}`)
                    break;
            }
            response({status: 'success', data: data});
            if (arg.action === 'update' && arg.liveUpdate) {
                event.emit('datalink', {bundle: arg.bundle, page: arg.page, data: data});
            }
        })
    });
};