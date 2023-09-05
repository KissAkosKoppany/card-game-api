import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLoadUserInfo } from '../../../hooks/useLoadUserInfo'
import { setOpponentBattleCards } from '../../../store/cards/cards.action'

import { GiTrophy, GiPartyPopper, GiWilliamTellSkull, GiBossKey } from 'react-icons/gi'

const BattleEndStoryMode = ({ battle, setBattleMode }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleOpponentCards = (cards) => {
        if(cards.length) {
            dispatch(setOpponentBattleCards(cards))
            setBattleMode(true)
            navigate('/fight/story-mode/card-select')
        } else {
            navigate('/fight/story-mode')
        }
    }

    useLoadUserInfo()

  return (
    <div className='battle-end-container'>
        <div className="battle-end-title">
            {
                battle.won
                ? <>
                    <GiTrophy />
                    <p>Victory</p>
                    <GiTrophy />
                  </>
                : <>
                    <GiWilliamTellSkull />
                    <p>Defeat</p>
                    <GiWilliamTellSkull />
                  </>
            }
        </div>
        <div className="battle-end-dashboard">
            <p><span><GiBossKey /></span> Stage {battle.stageNumber} <span><GiBossKey /></span></p>
            {
                battle.won
                    ? <p><span><GiPartyPopper /></span> Cleared <span><GiPartyPopper /></span></p>
                    : null
            }
            {
                battle.won
                    ? <button onClick={() => handleOpponentCards(battle.nextStageCards)}>Next Stage</button>
                    : <button onClick={() => handleOpponentCards(battle.currentStageCards)}>Try Again</button>
            }
            
        </div>
    </div>
  )
}

export default BattleEndStoryMode