const express = require('express');
const { httpGetCards, httpGetBossCards } = require('./cards.controller');

const cardsRouter = express.Router()

cardsRouter.get('/cards', httpGetCards)
cardsRouter.get('/bossCards', httpGetBossCards)

module.exports = cardsRouter;