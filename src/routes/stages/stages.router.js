const express = require('express')
const { httpGetStages } = require('./stages.controller')

const stagesRouter = express.Router()

stagesRouter.get('/stages', httpGetStages)

module.exports = stagesRouter