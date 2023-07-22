const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    username: String,
    email: String,
    id: String,
    currentStageStoryMode: Number,
    pvpBattlesPlayed: Number,
    pvpBattlesWon: Number,
    friends: [{
        id: String,
        name: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', usersSchema)