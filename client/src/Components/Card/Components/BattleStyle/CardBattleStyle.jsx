import React from 'react'
import CardBattleIcons from "./CardBattleIcons";
import CardBattleStats from "./CardBattleStats";


const CardBattleStyle = ({ card, opponent, pvp, i, videoRef, isReferee, turn, inSequence, handleSetSequence, socket, room }) => {

  return (
    <>
      {
        opponent ? null : <CardBattleIcons i={i} pvp={pvp} videoRef={videoRef} room={room} socket={socket} isReferee={isReferee} turn={turn} inSequence={inSequence} handleSetSequence={handleSetSequence} card={card} />
      }
      <CardBattleStats opponent={opponent} card={card} />
    </>
  )
}

export default CardBattleStyle