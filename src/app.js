const express = require('express');
const path = require('path')

const cors = require('cors');
const helmet = require('helmet')
const passport = require('passport')
const cookieSession = require('cookie-session')
const passportSetup = require('./config/passport.setup')
const morgan = require('morgan')

const authRouter = require('./routes/auth/auth.router')
const userRouter = require('./routes/user/user.router')
const cardsRouter = require('./routes/cards/cards.router')
const adminRouter = require('./routes/admin/admin.router')
const stagesRouter = require('./routes/stages/stages.router')

const app = express();

app.use(helmet());

app.use(cookieSession({
    maxAge: 24 * 60 * 60 *1000,
    keys: [ process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2 ]
}))

app.use(passport.initialize());

app.use(passport.session())

app.use(cors());
// app.use(morgan('combined'))
app.use(express.json());

// app.options("/parse", cors(), (req, res) => {
//     res.sendStatus(204);
// });

// app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/', (req, res) => {
    console.log('what is going on')
    res.status(200).json("what is going on")
})
app.use(authRouter);
app.use(userRouter);
app.use(cardsRouter);
app.use(adminRouter);
app.use(stagesRouter);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'), function (err) {
//         if(err) {
//             res.status(500).send(err)
//         }
//     })
// })

module.exports = app;