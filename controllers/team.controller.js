const Team = require('../models/team.model');

const TeamController = {
    // Get all teams from the database with optional query options, selection and population
    getTeams: (options = {}, selection = '', population = '') => {
        return new Promise((resolve, reject) => {
            Team.find(options, selection).populate(population)
            .then(teams => {
                resolve(teams);
            }).catch(err => {
                reject(err);
            });
        })
    },
    // Update a team in the database
    updateTeam: (id, data) => {
        return new Promise((resolve, reject) => {
            Team.findByIdAndUpdate(id, data)
            .then(team => {
                resolve(team);
            }).catch(err => {
                reject(err);
            });
        });
    },
    // Delete a team from the database
    deleteTeam: (id) => {
        return new Promise((resolve, reject) => {
            Team.findByIdAndDelete(id)
            .then(team => {
                resolve(team);
            }).catch(err => {
                reject(err);
            });
        });
    },
    // Create a team in the database
    createTeam: (data) => {
        return new Promise((resolve, reject) => {
            Team.create(data)
            .then(team => {
                resolve(team);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

module.exports = TeamController;