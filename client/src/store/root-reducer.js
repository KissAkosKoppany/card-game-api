import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { cardsReducer } from "./cards/cards.reducer";
import { pvpReducer } from "./pvp/pvp.reducer";
import { battleReducer } from "./battle/battle.reducer"
import { notificationsReducer } from "./notifications/notifications.reducer"; 

export const rootReducer = combineReducers({
    user: userReducer,
    cards: cardsReducer,
    pvp: pvpReducer,
    notifications: notificationsReducer,
    battle: battleReducer
})