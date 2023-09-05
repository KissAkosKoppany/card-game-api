import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setBattleEnd } from '../../../../store/battle/battle.action'
import { httpUpdateProfileAfterBattle } from "../../../../hooks/requests"
import { useNavigate } from "react-router-dom"

//useeffect if cards.length call navgate function with link from battle reducer
export const useBattleEndHandlerStoryMode = (playerCards, opponentCards, id, setBattleMode) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const battleEnd = useSelector(state => state.rootReducer.battle.battleEnd)
    const currentUser = useSelector(state => state.rootReducer.user.currentUser)

    //make with useCallback and update the profile info in database
    const checkBattleEnd = useCallback(async() => {
        const currentStageNumber = currentUser.currentStageStoryMode > battleEnd.stageNumber ? currentUser.currentStageStoryMode : battleEnd.stageNumber;
        if(!playerCards.length) {
            dispatch(setBattleEnd({
                mode: 'story',
                stageNumber: battleEnd.stageNumber,
                won: false,
                currentStageCards: battleEnd.currentStageCards,
                nextStageCards: battleEnd.nextStageCards,
            }))
            await httpUpdateProfileAfterBattle(id, {
                mode: 'story',
                stageNumber: currentStageNumber,
                won: false
            })
            setBattleMode(false)
            navigate('/battle-end')
        }
    
        if(!opponentCards.length) {
            const stageNumber = currentStageNumber === battleEnd.stageNumber ? currentStageNumber + 1 : currentStageNumber
            dispatch(setBattleEnd({
                mode: 'story',
                stageNumber: battleEnd.stageNumber,
                won: true,
                currentStageCards: battleEnd.currentStageCards,
                nextStageCards: battleEnd.nextStageCards,
            }))
            await httpUpdateProfileAfterBattle(id, {
                mode: 'story',
                stageNumber: stageNumber,
                won: true
            })
            setBattleMode(false)
            navigate('/battle-end')
        }
        // eslint-disable-next-line
    }, [playerCards.length, opponentCards.length, dispatch])

    useEffect(() => {
        checkBattleEnd()
    }, [checkBattleEnd])
}

export const useBattleEndHandlerPvP = (playerCards, opponentCards, isReferee, id, pvpPoints, setBattleMode) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const checkBattleEnd = useCallback(async() => {
        if(!playerCards.length) {
            console.log('pvpPoints', id, pvpPoints)
            //referee lost
            if(isReferee) {
                let points = (pvpPoints - 15) < 0 ? 0 : (pvpPoints - 15)
                dispatch(setBattleEnd({
                        mode: 'pvp',
                        won: false,
                        pvpPoints: points
                    }
                ))
                await httpUpdateProfileAfterBattle(id, {
                    mode: 'pvp',
                    won: false,
                    pvpPoints: points
                })
                setBattleMode(false)
                navigate('/battle-end')
            } else {
                dispatch(setBattleEnd({
                        mode: 'pvp',
                        won: true,
                        pvpPoints: pvpPoints + 15 + (opponentCards.length * 3)
                    }
                ))
                await httpUpdateProfileAfterBattle(id, {
                    mode: 'pvp',
                    won: true,
                    pvpPoints: pvpPoints + 15 + (opponentCards.length *3)
                })
                setBattleMode(false)
                navigate('/battle-end')
            }
        }

        if(!opponentCards.length) {
            console.log('pvpPoints', id, pvpPoints)
            //referee won
            if(isReferee) {
                dispatch(setBattleEnd({
                        mode: 'pvp',
                        won: true,
                        pvpPoints: pvpPoints + 15 + (playerCards.length * 3)
                    }
                ))
                await httpUpdateProfileAfterBattle(id, {
                    mode: 'pvp',
                    won: true,
                    pvpPoints: pvpPoints + 15 + (playerCards.length *3)
                })
                setBattleMode(false)
                navigate('/battle-end')
            } else {
                let points = (pvpPoints - 15) < 0 ? 0 : (pvpPoints - 15)
                dispatch(setBattleEnd({
                        mode: 'pvp',
                        won: false,
                        pvpPoints: points
                    }
                ))
                await httpUpdateProfileAfterBattle(id, {
                    mode: 'pvp',
                    won: false,
                    pvpPoints: points
                })
                setBattleMode(false)
                navigate('/battle-end')
            }
        }
        // eslint-disable-next-line
    }, [playerCards.length, opponentCards.length, dispatch])

    useEffect(() => {
        checkBattleEnd()
    }, [checkBattleEnd])
}