const passport = require('passport')
const { Strategy } = require('passport-google-oauth20')
const User = require('../models/users.mongo')

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
}

const AUTH_OPTIONS = {
    callbackURL: '/auth/google/redirect',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET
}

passport.serializeUser((user, done) => {
    console.log('seri', user.id)
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    console.log('deseri', id)
    done(null, id)
})

async function verifyCallback(accessToken, refreshToken, profile, done) {
    const currentUser = await User.findOne({ id: profile.id }, {'_id': 0, '__v': 0})
    if(currentUser) {
        done(null, currentUser)
    } else {
        const newUser = await new User({
            id: profile.id,
            username: profile.displayName,
            currentStageStoryMode: 1,
            storyModeBattlesPlayed: 0,
            storyModeBattlesWon: 0,
            pvpBattlesPlayed: 0,
            pvpBattlesWon: 0,
            pvpPoints: 0,
            image: profile.photos[0].value,
            admin: false,
            isOnline: false
        }).save()
        console.log('new user created')
        done(null, newUser)
    }
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback))