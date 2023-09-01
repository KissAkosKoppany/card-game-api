import { CARDS_ACTION_TYPES } from './cards.types'

const INITIAL_STATE = {
    cards: [],
    playerBattleCards: [],
    bossCards: [],
    opponentBattleCards: [],
}

export const cardsReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case CARDS_ACTION_TYPES.SET_CARDS:
          return {
            ...state,
            cards: payload
          }
        case CARDS_ACTION_TYPES.SET_PLAYER_BATTLE_CARDS:
          return {
            ...state,
            playerBattleCards: payload
          }
        case CARDS_ACTION_TYPES.SET_BOSS_CARDS:
          return {
            ...state,
            bossCards: payload
          }
        case CARDS_ACTION_TYPES.SET_OPPONENT_BATTLE_CARDS:
          return {
            ...state,
            opponentBattleCards: payload
          }
        default:
          return state
      }
}