import { PVP_ACTION_TYPES } from './pvp.types'

const INITIAL_STATE = {
    pvpRoom: '',
    pvpReferee: ''
}

export const pvpReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case PVP_ACTION_TYPES.SET_PVP_ROOM:
          return {
            ...state,
            pvpRoom: payload
          }
        case PVP_ACTION_TYPES.SET_PVP_REFEREE:
            return {
                ...state,
                pvpReferee: payload
            }
        default:
            return state
    }

}