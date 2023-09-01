const API_URL = 'https://ec2-16-171-139-106.eu-north-1.compute.amazonaws.com:8000/api'
// const API_URL = 'https://localhost:8000/api'

console.log('url', API_URL)

export async function getUserInfo() {
    try {
        const data = await fetch(`${API_URL}/currentUser`)
        const userInfo = await data.json()
        console.log('hellooo', userInfo)
        return userInfo
    } catch (err) {
        console.log("error loading user", err)
    }
}

export async function httpGetCards() {
    try {
        const data = await fetch(`${API_URL}/cards`)
        const cards = await data.json()
        return cards
    } catch (err){
        console.log('error loading cards', err)
    }
}

export async function httpGetBossCards() {
    try {
        const data = await fetch(`${API_URL}/bossCards`)
        const cards = await data.json()
        return cards
    } catch (err){
        console.log('error loading cards', err)
    }
}

export async function httpGetStages() {
    try {
        const data = await fetch(`${API_URL}/stages`)
        const stages = await data.json()
        return stages
    } catch(err) {
        console.log('error getting stages', err)
    }
}

export async function httpCreateCard(card) {
    await fetch(`${API_URL}/admin-page/create-card`, {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(card)
    })
}

export async function httpCreateBossCard(card) {
    await fetch(`${API_URL}/admin-page/create-boss-card`, {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(card)
    })
}

export async function httpCreateStage(stage) {
    await fetch(`${API_URL}/admin-page/create-stage`, {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(stage)
    })
}

export async function httpGetAllUser() {
    try {
        const data = await fetch(`${API_URL}/all-users`)
        const users = await data.json()
        return users
    } catch(err) {
        console.log('error geting all users', err)
    }
}

export async function httpGetAllFriends() {
    try {
        const data = await fetch(`${API_URL}/all-friends`)
        const friends = await data.json()
        return friends
    } catch(err) {
        console.log('error geting friends', err)
    }
}

export async function httpSendFriendRequest(request) {
    try {
        await fetch(`${API_URL}/send-friend-request`, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(request)
        })
    } catch(err) {
    console.log('error sending friend request', err)
    }
}

export async function httpAcceptFriendRequest(request) {
    try {
        await fetch(`${API_URL}/accept-friend-request`, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(request)
        })
    } catch(err) {
    console.log('error accepting friend request', err)
    }
}

export async function httpRejectFriendRequest(request) {
    try {
        await fetch(`${API_URL}/reject-friend-request`, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(request)
        })
    } catch(err) {
    console.log('error rejecting friend request', err)
    }
}

export async function httpGetPlayerInfo(id) {
    try {
        const data = await fetch(`${API_URL}/user/${id}`)
        const playerInfo = await data.json()
        return playerInfo
    } catch(err) {
        console.log('error getting player info', err)
    }
}

export async function httpUpdateProfileAfterBattle(id, data) {
    try {
        await fetch(`${API_URL}/user/${id}`, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
    } catch(err) {
        console.log('error updating profile after battle', err)
    }
}