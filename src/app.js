const express = require('express');

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
const stagesRouter = require('./routes/stages/stages.router');
// const flash = require('connect-flash');
// const session = require('express-session')
// const { promiseConnectFlash } = require('async-connect-flash')
// const MongoStore = require('connect-mongo');

const app = express();

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
//     if ('OPTIONS' == req.method) {
//          res.sendStatus(200);
//      } else {
//          next();
//      }
// });

app.use(helmet());
app.use(express.json());

app.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 *1000,
    keys: [ process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2 ],
}))

// app.use(session({
//     secret: 'hisSecret',
//     resave: false,
//     saveUninitialized: false,
// }))

// app.use(promiseConnectFlash())

app.use(passport.initialize());

app.use(passport.session())

app.use(cors())
// app.use(cors({
//     origin: 'https://ascendedbattle.com',
//     credentials: true,
// }));
// app.use(morgan('combined'))

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