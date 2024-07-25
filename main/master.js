const TeamController = require('../controllers/team.controller');
const PlayerController = require('../controllers/player.controller');

// This is a master controller that will handle all the CRUD operations for the models
const Master = {
    // This function will create data in the database
    create: (model, data) => {
        return new Promise((resolve, reject) => {
            switch (model) {
                case 'team':
                    TeamController.createTeam(data)
                    .then(team => {
                        resolve(team);
                    }).catch(err => {
                        reject(err);
                    });
                    break;
                case 'player':
                    PlayerController.createPlayer(data)
                    .then(player => {
                        resolve(player);
                    }).catch(err => {
                        reject(err);
                    });
                    break;
                default:
                    reject('Invalid model');
                    break;
            }
        });
    },
    // This function will read data from the database
    read: (model, options = {}, selection = '', population = '') => {
        return new Promise((resolve, reject) => {
            switch (model) {
                case 'team':
                    TeamController.getTeams(options, selection, population)
                    .then(teams => {
                        resolve(teams);
                    }).catch(err => {
                        reject(err);
                    });
                    break;
                case 'player':
                    PlayerController.getPlayers(options, selection, population)
                    .then(players => {
                        resolve(players);
                    }).catch(err => {
                        reject(err);
                    });
                    break;
                default:
                    reject('Invalid model');
                    break;
            }
        });
    },
    // This function will update data in the database
    update: (model, id, data) => {
        return new Promise((resolve, reject) => {
            switch (model) {
                case 'team':
                    TeamController.updateTeam(id, data)
                    .then(team => {
                        resolve(team);
                    }).catch(err => {
                        reject(err);
                    });
                    break;
                case 'player':
                    PlayerController.updatePlayer(id, data)
                    .then(player => {
                        resolve(player);
                    }).catch(err => {
                        reject(err);
                    });
                    break;
                default:
                    reject('Invalid model');
                    break;
            }
        });
    },
    // This function will delete data from the database
    delete: (model, id) => {
        return new Promise((resolve, reject) => {
            switch (model) {
                case 'team':
                    TeamController.deleteTeam(id)
                    .then(team => {
                        resolve(team);
                    }).catch(err => {
                        reject(err);
                    });
                    break;
                case 'player':
                    PlayerController.deletePlayer(id)
                    .then(player => {
                        resolve(player);
                    }).catch(err => {
                        reject(err);
                    });
                    break;
                default:
                    reject('Invalid model');
                    break;
            }
        });
    }
}

module.exports = Master;