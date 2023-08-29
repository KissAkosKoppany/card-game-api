const users = require('./users.mongo')

async function getUserInfo(userId) {
    const user = await users.findOne({ id: userId }, {'_id': 0, '__v': 0})
    return user
    //check if user and handle error
}

async function updateUserRequests(requestData) {
    await users.updateOne({
        id: requestData.receiverId
    }, {
        requests: [{
            senderId: requestData.senderId,
            senderName: requestData.senderName,
            senderImage: requestData.senderImage
        }]
    }, {
        upsert: true
    })
}

async function acceptFriendRequest(requestData) {
    await users.updateOne({
        id: requestData.receiverId
    }, {
        friends: [{
            id: requestData.senderId,
            username: requestData.senderName,
            image: requestData.senderImage
        }]
    }, {
        upsert: true
    })
    await users.updateOne({
        id: requestData.senderId
    }, {
        friends: [{
            id: requestData.receiverId,
            username: requestData.receiverName,
            image: requestData.receiverImage
        }]
    }, {
        upsert: true
    })
    await users.updateOne({
        id: requestData.receiverId
    }, {
        $pull: {
            requests: { _id: requestData.deleteId }
        }
    })
}

async function rejectFriendRequest(requestData) {
    await users.updateOne({
        id: requestData.receiverId
    }, {
        $pull: {
            requests: { _id: requestData.deleteId }
        }
    })
}

async function getAllUsers() {
    const usersList = await users.find({}, {
        '_id': 0,
        '__v': 0,
        'pvpBattlesWon': 0,
        'pvpBattlesPlayed': 0,
        'admin': 0,
        'createdAt': 0,
        'storyModeBattlesPlayed': 0,
        'storyModeBattlesWon': 0,
        'friends': 0,
        'requests': 0
    })
    return usersList
}

async function updateUserAfterBattleEnd(battle, userId) {
    if(battle.mode === 'story') {
        if(battle.won) {
            await users.updateOne({id: userId}, {
                currentStageStoryMode: battle.stageNumber,
                $inc: {
                    storyModeBattlesPlayed: 1,
                    storyModeBattlesWon: 1
                }
            }, {
                upsert: true
            })
        } else {
            await users.updateOne({id: userId}, {
                $inc: {
                    storyModeBattlesPlayed: 1,
                }
            }, {
                upsert: true
            })
        }
    }

    if(battle.mode === 'pvp') {
        if(battle.won) {
            await users.updateOne({id: userId}, {
                pvpPoints: battle.pvpPoints,
                $inc: {
                    pvpBattlesPlayed: 1,
                    pvpBattlesWon: 1
                }
            }, {
                upsert: true
            })
        } else {
            await users.updateOne({id: userId}, {
                pvpPoints: battle.pvpPoints,
                $inc: {
                    pvpBattlesPlayed: 1
                }
            }, {
                upsert: true
            })
        }
    }
}

async function updateUsername(userId, newUsername) {
    await users.updateOne({id: userId}, {
        username: newUsername
    }, {
        upsert: true
    })
}

async function updateProfileImage(userId, newImage) {
    await users.updateOne({id: userId}, {
        image: newImage
    }, {
        upsert: true
    })
}

module.exports = {
    getUserInfo,
    getAllUsers,
    updateUserRequests,
    acceptFriendRequest,
    rejectFriendRequest,
    updateUserAfterBattleEnd,
    updateUsername,
    updateProfileImage
}