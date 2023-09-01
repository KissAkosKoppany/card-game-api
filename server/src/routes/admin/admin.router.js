const express = require('express')
const { httpCreateCard, httpCreateBossCard, httpCreateStage } = require('./admin.controller')

const adminRouter = express.Router()

adminRouter.post('/api/admin-page/create-card', httpCreateCard)
adminRouter.post('/api/admin-page/create-boss-card', httpCreateBossCard)
adminRouter.post('/api/admin-page/create-stage', httpCreateStage)

module.exports = adminRouter;