import { BATTLE_ACTION_TYPES } from "./battle.types";
import { createAction } from "../../ustils/reducer/reducer.utils";

export const setBattleEnd = (battleEnd) => {
    return createAction(BATTLE_ACTION_TYPES.SET_BATTLE_END, battleEnd)
}

export const setPvpPlayers = (pvpPlayers) => {
    return createAction(BATTLE_ACTION_TYPES.SET_PVP_PLAYERS, pvpPlayers)
}