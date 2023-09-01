import { CARDS_ACTION_TYPES } from './cards.types'
import { createAction } from '../../ustils/reducer/reducer.utils'

export const setCards = (cards) => {
    return createAction(CARDS_ACTION_TYPES.SET_CARDS, cards)
}

export const setBossCards = (cards) => {
    return createAction(CARDS_ACTION_TYPES.SET_BOSS_CARDS, cards)
}

export const setPlayerBattleCards = (cards) => {
    return createAction(CARDS_ACTION_TYPES.SET_PLAYER_BATTLE_CARDS, cards)
}

export const setOpponentBattleCards = (cards) => {
    return createAction(CARDS_ACTION_TYPES.SET_OPPONENT_BATTLE_CARDS, cards)
}