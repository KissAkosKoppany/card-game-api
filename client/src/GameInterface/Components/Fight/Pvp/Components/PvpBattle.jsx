import React, { useCallback, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { usePvpSequence } from '../../BattleSequence/usePvpSequence'

import Card from '../../../../../Components/Card/Card'
import RoundIndicator from '../../Components/RoundIndicator'

const PvpBattle = ({ socket, setBattleMode }) => {

    const [isReferee, setIsReferee] = useState(false)

    const currentUser = useSelector(state => state.rootReducer.user.currentUser)
    const refereeId = useSelector(state => state.rootReducer.pvp.pvpReferee)
    const room = useSelector(state => state.rootReducer.pvp.pvpRoom)

    const handleReferee = useCallback(() => {
      if(refereeId === currentUser.id) {
          setIsReferee(true)
      } else {
          setIsReferee(false)
      }
    }, [refereeId, currentUser.id])

    useEffect(() => {
      handleReferee()
    }, [handleReferee])

    const {
        turn,
        inSequence,
        opponentCards,
        playerCards,
        playerAnimation,
        opponentAnimation,
        round,
        setSequence,
        fallenCards,
        showFallenCards,
        setShowFallenCards,
        setPlayerCards,
        setOpponentCards
    } = usePvpSequence(room, socket, isReferee, setBattleMode, currentUser.id, currentUser.pvpPoints)

    const handleSetSequence = (mode, index, card) => {
        if (turn === 0 && isReferee && !inSequence && card?.skillCharge === card?.skillCount && card?.sakuraSilence !== true) {
          setSequence({turn, mode: mode, index: index})
          if(mode === 'activeSkill') {
            socket.emit('skillVideo', card?.id, room)
          }
        }
        if (turn === 1 && !isReferee && !inSequence && card?.skillCharge === card?.skillCount && card?.sakuraSilence !== true) {
          if(mode === 'activeSkill') {
            socket.emit('skillVideo', card?.id, room)
          }
          socket.emit('opponentSetSequence', turn, mode, index, room)
        }
      }

      const handleCardSelectSkill = (card) => {
        if(turn === 0) {
          setPlayerCards([...playerCards, card])
          setShowFallenCards(false)
        } else {
          setOpponentCards([...opponentCards, card])
          setShowFallenCards(false)
        }
      }

      // console.log("fallen cards", fallenCards)
    

  return (
    <div className='battle-container'>
      <div className="battle-bg-decor"></div>
        {
          showFallenCards && fallenCards.length
            ? <div className='fallen-cards-container'>
              {
                fallenCards.map(card => (
                  <div onClick={() => handleCardSelectSkill(card)} key={card?.id} className="card-select">
                    <Card card={card} cardStyle="select" />
                  </div>
                ))
              }
              </div>
            : null
        }
      <div className={`opponent-cards-container ${turn === 1 ? "turn-indicator" : ""}`}>
        {
          opponentCards.map((card, i) => (
            <Card pvp={true} card={card} key={card?.id} i={i} socket={socket} room={room} isReferee={false} inSequence={inSequence} turn={turn} round={round} playerAnimation={opponentAnimation} handleSetSequence={handleSetSequence} cardStyle="battle" opponent={isReferee} position={'up'} />
          ))
        }
      </div>
      <RoundIndicator round={round} />
      <div className={`player-cards-container ${turn === 0 ? "turn-indicator" : ""}`}>
        {
          playerCards.map((card, i) => (
            <Card pvp={true} card={card} key={card?.id} i={i} socket={socket} room={room} isReferee={true} inSequence={inSequence} turn={turn} round={round} playerAnimation={playerAnimation} handleSetSequence={handleSetSequence} cardStyle="battle" opponent={!isReferee} position={'down'} />
          ))
        }
      </div>
    </div>
  )
}

export default PvpBattle