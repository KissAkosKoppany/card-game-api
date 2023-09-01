const express = require('express');
const { httpGetCards, httpGetBossCards } = require('./cards.controller');

const cardsRouter = express.Router()

cardsRouter.get('/api/cards', httpGetCards)
cardsRouter.get('/api/bossCards', httpGetBossCards)

module.exports = cardsRouter;