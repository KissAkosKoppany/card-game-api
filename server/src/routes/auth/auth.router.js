const express = require('express')
const passport = require('passport');
const { redirectAfterLogin, logoutUser } = require('./auth.controller')

const authRouter = express.Router();

authRouter.get('/api/auth/google', passport.authenticate('google', {
    scope: ['profile']
}));

authRouter.get('/api/auth/google/redirect', passport.authenticate('google'), redirectAfterLogin)

authRouter.get('/api/auth/logout', logoutUser)

module.exports = authRouter;