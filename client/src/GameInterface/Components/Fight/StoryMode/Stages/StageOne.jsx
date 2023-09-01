import React from 'react'
import Card from '../../../../../Components/Card/Card'
import OpponentCard from '../../../../../Components/Card/OpponentCard'
import { useBattleSequence } from '../../BattleSequence/useBattleSequence'
import RoundIndicator from '../../Components/RoundIndicator'
import { useSelector } from 'react-redux'

const StageOne = ({ setBattleMode }) => {

  const currentUser = useSelector(state => state.rootReducer.user.currentUser)
  
  const {
      turn,
      inSequence,
      monsterCards,
      playerCards,
      playerAnimation,
      opponentAnimation,
      round,
      setSequence,
      sequence,
  } = useBattleSequence(currentUser.id, setBattleMode)

  const handleSetSequence = (mode, index, card) => {
    if (turn === 0 && !inSequence && card?.skillCharge === card?.skillCount && card?.sakuraSilence !== true) {
      setSequence({turn, mode: mode, index: index})
    }
  }

  return (
    <div className='battle-container'>
      <div className="battle-bg-decor"></div>
      <div className={`opponent-cards-container ${turn === 1 ? "turn-indicator" : ""}`}>
        {
          monsterCards.map((card, i) => (
            <OpponentCard pvp={false} key={card?.id} i={i} card={card} ai={true} sequence={sequence} round={round} turn={turn} opponentAnimation={opponentAnimation} cardStyle="battle" opponent={true} position={'up'} />
          ))
        }
      </div>
      <RoundIndicator round={round} />
      <div className={`player-cards-container ${turn === 0 ? "turn-indicator" : ""}`}>
        {
          playerCards.map((card, i) => (
            <Card pvp={false} card={card} key={card?.id} i={i} isReferee={true} inSequence={inSequence} turn={turn} round={round} playerAnimation={playerAnimation} handleSetSequence={handleSetSequence} cardStyle="battle" opponent={false} position={'down'} />
          ))
        }
      </div>
    </div>
  )
}

export default StageOne