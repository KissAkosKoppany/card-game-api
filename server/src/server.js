const fs = require('fs');
const https = require('https')
const mongoose = require('mongoose');
const io = require('socket.io');

require('dotenv').config();

const app = require('./app')
const PORT = process.env.PORT || 8000;

https.globalAgent.options.rejectUnauthorized = false;

const server = https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app)

console.log('test 4')

const socketServer = io(server)

const sockets = require('./sockets')

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
    
    sockets.listen(socketServer)
}

startServer()
