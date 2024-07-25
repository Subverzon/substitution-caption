const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tricode: {
        type: String,
        required: true
    }
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;