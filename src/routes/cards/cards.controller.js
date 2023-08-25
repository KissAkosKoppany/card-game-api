const { getBossCards } = require('../../models/bossCards.model')
const { getCards } = require('../../models/cards.model')

async function httpGetCards(req, res) {
    const cards = await getCards()
    return res.status(200).json(cards)
}

async function httpGetBossCards(req, res) {
    const bossCards = await getBossCards()
    return res.status(200).json(bossCards)
}

module.exports = {
    httpGetCards,
    httpGetBossCards
}