const express = require('express');
const { httpLoadUserInfo, httpLoadAllUsers, httpGetPlayerInfo, httpUpdateProfileImage, httpUpdateUserRequests, httpUpdateUsername, httpUpdateProfileAfterBattle, httpAcceptFriendRequest, httpRejectFriendRequest } = require('./user.controller');

const userRouter = express.Router();

userRouter.get('/api/currentUser', httpLoadUserInfo)
userRouter.get('/api/user/:id', httpGetPlayerInfo)
userRouter.get('/api/all-users', httpLoadAllUsers)
userRouter.post('/api/send-friend-request', httpUpdateUserRequests)
userRouter.post('/api/accept-friend-request', httpAcceptFriendRequest)
userRouter.post('/api/reject-friend-request', httpRejectFriendRequest)
userRouter.post('/api/user/:id', httpUpdateProfileAfterBattle)
userRouter.post('/api/update-username/:id', httpUpdateUsername)
userRouter.post('/api/update-image/:id', httpUpdateProfileImage)

module.exports = userRouter;