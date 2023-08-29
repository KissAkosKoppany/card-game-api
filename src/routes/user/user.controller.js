const { getUserInfo, getAllUsers, updateUserRequests, acceptFriendRequest, updateUsername, updateProfileImage, updateUserAfterBattleEnd, rejectFriendRequest } = require('../../models/users.model')

async function httpLoadUserInfo(req, res) {
    if(req.user) {
        const user = await getUserInfo(req.user)
        res.status(200).json(user)
    }
}

async function checkAdmin(req, res, next) {
    const user = await getUserInfo(req.user)
    if (!user.admin) {
        res.redirect('https://localhost:8000/')
    } else next()
}

async function httpLoadAllUsers(req, res) {
    const users = await getAllUsers()
    res.status(200).json(users)
}

async function httpUpdateUserRequests(req, res) {
    const data = req.body;
    await updateUserRequests(data)
    return res.status(201).json(data)
}

async function httpAcceptFriendRequest(req, res) {
    const data = req.body;
    await acceptFriendRequest(data)
    return res.status(201).json(data)
}

async function httpRejectFriendRequest(req, res) {
    const data = req.body;
    await rejectFriendRequest(data);
    return res.status(201).json(data)
}

async function httpGetPlayerInfo(req, res) {
    const playerId = req.params.id;
    const playerInfo = await getUserInfo(playerId)
    return res.status(201).json(playerInfo)
}

async function httpUpdateProfileAfterBattle(req, res) {
    const id = req.params.id;
    const battleData = req.body;
    await updateUserAfterBattleEnd(battleData, id)
    return res.status(201).json(battleData)
}

async function httpUpdateUsername(req, res) {
    const id = req.params.id;
    const newUsername = req.body;
    await updateUsername(id, newUsername)
    return res.status(201).json(newUsername)
}

async function httpUpdateProfileImage(req, res) {
    const id = req.params.id;
    const newImage = req.body;
    await updateProfileImage(id, newImage)
    res.status(201).json(newImage)
}

module.exports = {
    httpLoadUserInfo,
    checkAdmin,
    httpLoadAllUsers,
    httpUpdateUserRequests,
    httpAcceptFriendRequest,
    httpRejectFriendRequest,
    httpGetPlayerInfo,
    httpUpdateProfileAfterBattle,
    httpUpdateUsername,
    httpUpdateProfileImage
}