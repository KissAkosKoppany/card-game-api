import { soundEffects } from "../SoundEffects/soundEffects"

const API_URL = 'https://ascendedcardbattle.com/api';
// const API_URL = 'https://localhost:8000/api'

export async function getUserInfo() {
    try {
        const data = await fetch(`${API_URL}/currentUser`)
        const userInfo = await data.json()
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
    try {
        await fetch(`${API_URL}/admin-page/create-card`, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(card)
        })
        soundEffects.success.play()
    } catch(err) {
        soundEffects.fail.play()
        console.log('error creating card', err)
    }
}

export async function httpCreateBossCard(card) {
    try {
        await fetch(`${API_URL}/admin-page/create-boss-card`, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(card)
        })
        soundEffects.success.play()
    } catch(err) {
        soundEffects.fail.play()
        console.log('error creating boss card', err)
    }
}

export async function httpCreateStage(stage) {
    try {
        await fetch(`${API_URL}/admin-page/create-stage`, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(stage)
        })
        soundEffects.success.play()
    } catch(err) {
        soundEffects.fail.play()
        console.log('error creating stage', err)
    }
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

export async function httpUpdateUsername(id, data) {
    try {
        await fetch(`${API_URL}/update-username/${id}`, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
    } catch(err) {
        soundEffects.fail.play()
        console.log('error updating username', err)
    }
}

export async function httpUpdateProfileImage(id, data) {
    try {
        await fetch(`${API_URL}/update-image/${id}`, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
    } catch(err) {
        soundEffects.fail.play()
        console.log('error updating username', err)
    }
}