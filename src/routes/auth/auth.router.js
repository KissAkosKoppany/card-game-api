const express = require('express')
const passport = require('passport')

const authRouter = express.Router();

authRouter.get('/auth/google', passport.authenticate('google', {
    scope: [ 'profile' ]
}));

authRouter.get('/auth/google/redirect', passport.authenticate('google', {
    failureRedirect: "/faliure",
    successRedirect: '/',
    session: false
}), (req, res) => {
    console.log('google auth yesss')
})

authRouter.get('/logout', (req, res) => {})

module.exports = authRouter;