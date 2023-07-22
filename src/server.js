const fs = require('fs');
const https = require('https');
const mongoose = require('mongoose');

require('dotenv').config();

const app = require('./app')
const PORT = process.env.PORT || 3000;

const server = https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app)

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!')
})

mongoose.connection.on('error', err => {
    console.error(err)
})

async function startServer() {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    })
}

startServer()
