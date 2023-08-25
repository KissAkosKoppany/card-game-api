const { getStages } = require('../../models/stages.model')

async function httpGetStages(req, res) {
    const stages = await getStages()
    return res.status(200).json(stages)
}

module.exports = {
    httpGetStages
}