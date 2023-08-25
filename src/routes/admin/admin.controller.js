const { createCard } = require('../../models/cards.model')
const { createBossCard } = require('../../models/bossCards.model')
const { createStage } = require('../../models/stages.model')

async function httpCreateCard(req, res) {
    const card = req.body
    await createCard(card)
    return res.status(201).json(card)
}

async function httpCreateBossCard(req, res) {
    const card = req.body
    await createBossCard(card)
    return res.status(201).json(card)
}

async function httpCreateStage(req, res) {
    const stage = req.body
    await createStage(stage)
    return res.status(201).json(stage)
}

module.exports = {
    httpCreateCard,
    httpCreateStage,
    httpCreateBossCard
}