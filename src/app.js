const express = require('express');
const cors = require('cors');
const helmet = require('helmet')
const passport = require('passport')

const passportSetup = require('./config/passport.setup')

const path = require('path')

const authRouter = require('./routes/auth/auth.router')

const app = express();

app.use(helmet());
app.use(passport.initialize());
app.use(cors());
app.use(express.json());
app.use(authRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app;