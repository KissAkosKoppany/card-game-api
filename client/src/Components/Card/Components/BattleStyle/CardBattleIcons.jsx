import React from 'react'
import { GiBookmarklet, GiBouncingSword } from 'react-icons/gi';
import { delay } from '../../../../GameInterface/Components/Fight/BattleSequence/helpers';

const CardBattleIcons = ({ card, handleSetSequence, pvp, isReferee, inSequence, turn, videoRef, i }) => {

  const handleVideoPlay = async() => {
    if(!pvp) {
      const video = videoRef.current
      console.log('in handle video play')
        if (!inSequence && isReferee && turn === 0 && card?.skillCharge === card?.skillCount && card?.sakuraSilence !== true) {
          console.log('inside if block', video)
          await delay(2600)
          video.play()
        }
        if (!inSequence && !isReferee && turn === 1 && card?.skillCharge === card?.skillCount && card?.sakuraSilence !== true) {
          console.log('inside if block', video)
          await delay(2600)
          video.play()
        }
    }
  }

  return (
    <div className='card-battle-icons-wrapper'>
        <div onClick={() => {handleSetSequence("activeSkill", i, card); handleVideoPlay()}} className="card-battle-icon-container">
          <div className={`card-battle-icon-border ${card?.theme}`}></div>
          <GiBookmarklet className='card-battle-icon' />
        </div>
        <div onClick={() => {handleSetSequence("normalAttack", i)}} className="card-battle-icon-container">
          <div className={`card-battle-icon-border ${card?.theme}`}></div>
          <GiBouncingSword className='card-battle-icon' />
        </div>
      </div>
  )
}

export default CardBattleIcons