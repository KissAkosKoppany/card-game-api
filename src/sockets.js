const { getAllUsers } = require('./models/users.model')
const users = require('./models/users.mongo')

function listen(io) {
    let clients = {}
    let rooms = {}
    io.on('connect', async(socket) => {
        console.log('user connected')

        
        
        const userId = socket.handshake.auth.token
        console.log(userId)
        
        if(userId) {
            clients[userId] = socket.id
            await users.updateOne( { id: userId }, {
                isOnline: true
            }, {
                upsert: true
            })
        }
        const usersList = await getAllUsers()
        io.emit('refreshUsers', usersList)
        

        socket.on('disconnect', async() => {
            console.log('user disconected')
            if(userId) {
                await users.updateOne( { id: userId }, {
                    isOnline: false
                }, {
                    upsert: true
                })
            }
            const usersList = await getAllUsers()
            io.emit('refreshUsers', usersList)
        })

        socket.on('sendRequest', (userId, sender) => {
            let room = clients[userId]
            rooms[room] = 0
            // console.log('sender:', sender.id, '..userId:', userId)
            socket.to(room).emit('battleRequest', sender, room)
            socket.join(room)
        })

        socket.on('battleRejected', (room) => {
            io.in(room).emit('notifyBattleRejected')
        })

        socket.on('battleRequestAccepted', (room, refereeId) => {
            io.in(room).emit('startCardSelect', room, refereeId)
        })

        socket.on('playerReady', (cards, room, isReferee) => {
            io.in(room).emit('setCards', cards, isReferee)
            rooms[room] += 1
            if(rooms[room] === 2) {
                io.in(room).emit('startBattle', cards, isReferee)
            }
        })

        //gameplay logic
        socket.on('opponentSetSequence', (turn, mode, index, room) => {
            io.in(room).emit('setSequence', turn, mode, index)
        })

        socket.on('setInSequence', (inSequence, room) => {
            socket.to(room).emit('updateInSequence', inSequence)
        })

        socket.on('animation', (attackAnimation, turn, room) => {
            // console.log('playeranimation', attackAnimation)
            socket.to(room).emit('setAnimation', attackAnimation, turn)
        })

        socket.on('attackSoundEffect', room => {
            socket.to(room).emit('playAttackSoundEffect')
        })

        socket.on('dmgTakeSoundEffect', room => {
            socket.to(room).emit('playDmgTakeSoundEffect')
        })

        socket.on('normalAttack', (receiverId, actionName, damage, turn, room) => {
            socket.to(room).emit('setNormalAttack', receiverId, actionName, damage, turn)
        })

        socket.on('damageReceived', (receiverId, damageTaken, turn, room) => {
            socket.to(room).emit('setDamageReceived', receiverId, damageTaken, turn)
        })

        socket.on('skillChargeUpdate', (attacker, turn, room) => {
            socket.to(room).emit('setSkillChargeUpdate', attacker, turn)
        })

        socket.on('cardDeathCheck', (turn, room) => {
            socket.to(room).emit('checkCardDeath', turn)
        })

        socket.on('round', (round, room) => {
            socket.to(room).emit('updateRound', round)
        })

        socket.on('changeTurn', (turn, room) => {
            socket.to(room).emit('updateTurn', turn)
        })

        socket.on('skillChargeUpdateAtRoundEnd', (round, room) => {
            socket.to(room).emit('updateSkillChargeAll', round)
        })

        socket.on('updateSkillChargeActive', (attacker, value, turn, room) => {
            socket.to(room).emit('updateSkillChargeActive', attacker, value, turn)
        })

        socket.on('skillVideo', (cardId, room) => {
            // console.log('video', cardId)
            io.in(room).emit('playSkillVideo', cardId)
        })

        socket.on('activeSkill', (playerCards, opponentCards, attacker, receiver, round, turn, room) => {
            socket.to(room).emit('handleActiveSkill', playerCards, opponentCards, attacker, receiver, round, turn)
        })

        socket.on('handleEffects', (playerEffects, opponentEffects, round, room) => {
            socket.to(room).emit('setEffects', playerEffects, opponentEffects, round)
        })

        console.log("clients",clients)
    })
}

module.exports = {
    listen
}