import { NOTIFICATIONS_ACTION_TYPES } from './notifications.types'

const INITIAL_STATE = {
    notifications: []
}

export const notificationsReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case NOTIFICATIONS_ACTION_TYPES.SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: payload
            }
        default:
            return state
    }
}