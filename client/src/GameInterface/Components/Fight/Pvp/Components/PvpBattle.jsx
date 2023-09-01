import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../../../../../Components/Card/Card'
import RoundIndicator from '../../Components/RoundIndicator'
import { usePvpSequence } from '../../BattleSequence/usePvpSequence'

const PvpBattle = ({ socket, setBattleMode }) => {

    const [isReferee, setIsReferee] = useState(false)

    const currentUser = useSelector(state => state.rootReducer.user.currentUser)
    const refereeId = useSelector(state => state.rootReducer.pvp.pvpReferee)
    const room = useSelector(state => state.rootReducer.pvp.pvpRoom)

    useEffect(() => {
        if(refereeId == currentUser.id) {
            setIsReferee(true)
        } else {
            setIsReferee(false)
        }
    }, [refereeId, currentUser.id])

    const {
        turn,
        inSequence,
        opponentCards,
        playerCards,
        playerAnimation,
        opponentAnimation,
        round,
        setSequence,
    } = usePvpSequence(room, socket, isReferee, setBattleMode, currentUser.id, currentUser.pvpPoints)

    const handleSetSequence = (mode, index, card) => {
        if (turn === 0 && isReferee && !inSequence && card?.skillCharge === card?.skillCount && card?.sakuraSilence !== true) {
          setSequence({turn, mode: mode, index: index})
          if(mode === 'activeSkill') {
            console.log('referee mod active', card.name)
            socket.emit('skillVideo', card?.id, room)
          }
          console.log('setSequence on click referee')
        //  socket.emit('setSequence', turn, mode, index, card, room)
        //  don't need cuz sequence is relevant only for referee
        }
        if (turn === 1 && !isReferee && !inSequence && card?.skillCharge === card?.skillCount && card?.sakuraSilence !== true) {
          console.log('opponentSetSequence')
          if(mode === 'activeSkill') {
            console.log('opponent mod active')
            socket.emit('skillVideo', card?.id, room)
          }
          socket.emit('opponentSetSequence', turn, mode, index, room)
        }
      }
    

  return (
    <div className='battle-container'>
      <div className="battle-bg-decor"></div>
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