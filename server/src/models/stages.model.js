const stages = require('./stages.mongo')

async function createStage(stage) {
    await stages.updateOne({
        stageNumber: stage.stageNumber
    }, stage, {
        upsert: true
    })
}

async function getStages() {
    const stagesData = await stages.find({}, {
        '_id': 0, '__v': 0
    })
    return stagesData
}

module.exports = {
    createStage,
    getStages
}