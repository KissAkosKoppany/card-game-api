const mongoose = require('mongoose')

const stagesSchema = new mongoose.Schema({
    title: String,
    cards: [ String ],
    cardStyle: [ String ],
    stageNumber: Number,
    currentStageLink: String,
    nextStageCards: [ String ]
})

module.exports = mongoose.model('Stage', stagesSchema)