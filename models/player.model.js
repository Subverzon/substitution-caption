const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }
});

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;