const cards = require('./cards.mongo')

async function createCard(card) {
    await cards.updateOne({
        id: card.id
    }, card, {
        upsert: true
    })
}

async function getCards() {
    const playerCards = await cards.find({}, {
        '_id': 0, '__v': 0
    })
    return playerCards;
}

module.exports = {
    createCard,
    getCards
}