const Player = require('../models/player.model');

const PlayerController = {
    // Get all players from the database with optional query options, selection and population
    getPlayers: (options = {}, selection = '', population = '') => {
        return new Promise((resolve, reject) => {
            Player.find(options, selection).populate(population)
            .then(players => {
                resolve(players);
            }).catch(err => {
                reject(err);
            });
        })
    },
    // Update a player in the database
    updatePlayer: (id, data) => {
        return new Promise((resolve, reject) => {
            Player.findByIdAndUpdate(id, data)
            .then(player => {
                resolve(player);
            }).catch(err => {
                reject(err);
            });
        });
    },
    // Delete a player from the database
    deletePlayer: (id) => {
        return new Promise((resolve, reject) => {
            Player.findByIdAndDelete(id)
            .then(player => {
                resolve(player);
            }).catch(err => {
                reject(err);
            });
        });
    },
    // Create a player in the database
    createPlayer: (data) => {
        return new Promise((resolve, reject) => {
            Player.create(data)
            .then(player => {
                resolve(player);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

module.exports = PlayerController;