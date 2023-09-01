import React from 'react'
import { GiTrophy, GiPartyPopper, GiWilliamTellSkull, GiBossKey } from 'react-icons/gi'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setOpponentBattleCards } from '../../../store/cards/cards.action'
import { useLoadUserInfo } from '../../../hooks/useLoadUserInfo'


const BattleEndStoryMode = ({ battle, setBattleMode }) => {

    const dispatch = useDispatch()

    const handleOpponentCards = (cards) => {
        dispatch(setOpponentBattleCards(cards))
        setBattleMode(true)
    }

    useLoadUserInfo()

  return (
    <div className='battle-end-container'>
        <div className="battle-end-title">
            {
                battle.won
                ? <>
                    <GiTrophy />
                    <h1>Victory</h1>
                    <GiTrophy />
                  </>
                : <>
                    <GiWilliamTellSkull />
                    <h1>Defeat</h1>
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
                    ? <Link to="/fight/story-mode/card-select"><button onClick={() => handleOpponentCards(battle.nextStageCards)}>Next Stage</button></Link>
                    : <Link to="/fight/story-mode/card-select"><button onClick={() => handleOpponentCards(battle.currentStageCards)}>Try Again</button></Link>
            }
            
        </div>
    </div>
  )
}

export default BattleEndStoryMode