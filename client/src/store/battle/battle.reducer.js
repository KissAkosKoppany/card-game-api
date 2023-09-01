import { BATTLE_ACTION_TYPES } from './battle.types'

const INITIAL_STATE = {
    battleEnd: null,
    pvpPlayers: null
}

export const battleReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type) {
        case BATTLE_ACTION_TYPES.SET_BATTLE_END:
            return {
                ...state,
                battleEnd: payload
            }
        case BATTLE_ACTION_TYPES.SET_PVP_PLAYERS:
            return {
                ...state,
                pvpPlayers: payload
            }
        default:
            return state
    }
}