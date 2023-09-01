import { PVP_ACTION_TYPES } from "./pvp.types";
import { createAction } from "../../ustils/reducer/reducer.utils";

export const setPvpRoom = (room) => {
    return createAction(PVP_ACTION_TYPES.SET_PVP_ROOM, room)
}

export const setPvpReferee = (referee) => {
    return createAction(PVP_ACTION_TYPES.SET_PVP_REFEREE, referee)
}