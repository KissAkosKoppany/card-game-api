const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    currentStageStoryMode: {
        type: Number,
        required: true
    },
    storyModeBattlesPlayed: {
        type: Number,
        required: true
    },
    storyModeBattlesWon: {
        type: Number,
        required: true
    },
    pvpBattlesPlayed: {
        type: Number,
        required: true
    },
    pvpBattlesWon: {
        type: Number,
        required: true
    },
    pvpPoints: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    admin: Boolean,
    isOnline: {
        type: Boolean,
        required: true
    },
})

module.exports = mongoose.model('User', usersSchema)