const bosscards = require('./bossCards.mongo')

async function createBossCard(card) {
    await bosscards.updateOne({
        id: card.id
    }, card, {
        upsert: true
    })
}

async function getBossCards() {
    const bossCards = await bosscards.find({}, {
        '_id': 0, '__v': 0
    })
    return bossCards;
}

module.exports = {
    createBossCard,
    getBossCards
}