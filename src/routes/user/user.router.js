const express = require('express');
const { httpLoadUserInfo, httpLoadAllUsers, httpGetPlayerInfo, httpUpdateUserRequests, httpUpdateProfileAfterBattle, httpAcceptFriendRequest, httpRejectFriendRequest } = require('./user.controller');

const userRouter = express.Router();

userRouter.get('/user', httpLoadUserInfo)
userRouter.get('/user/:id', httpGetPlayerInfo)
userRouter.get('/all-users', httpLoadAllUsers)
userRouter.post('/send-friend-request', httpUpdateUserRequests)
userRouter.post('/accept-friend-request', httpAcceptFriendRequest)
userRouter.post('/reject-friend-request', httpRejectFriendRequest)
userRouter.post('/user/:id', httpUpdateProfileAfterBattle)

module.exports = userRouter;