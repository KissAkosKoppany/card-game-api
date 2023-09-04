import React, { useEffect, useRef } from 'react';

import { delay } from '../../GameInterface/Components/Fight/BattleSequence/helpers';
import { useCardDeath } from '../../GameInterface/Components/Hooks/useCardDeath';

import CardName from './Components/CardName';
import CardImage from './Components/CardImage';
import CardDoTCover from './Components/BattleStyle/CardDoTCover';
import CardStatList from './Components/StatStyle/CardStatList';
import CardBackground from './Components/CardBackground';
import CardBattleStyle from './Components/BattleStyle/CardBattleStyle';
import CardActionCover from './Components/BattleStyle/CardActionCover';
import CardEffectIconsBar from './Components/BattleStyle/CardEffectIconsBar';

import './Card.css';

const OpponentCard = ({ card, round, cardStyle, opponent, turn, sequence, opponentAnimation, i, position }) => {

    const videoRef = useRef();

    const { index, mode } = sequence

    const { deathAnimation } = useCardDeath(card?.hp)

    useEffect(() => {
      const opponentActiveSkillVideo = async() => {
        if (index === i && mode === "activeSkill" && turn === 1) {
          await delay(2600)
          videoRef.current.play()
        }
      }
      opponentActiveSkillVideo()
      // eslint-disable-next-line
    }, [sequence])

    return (
            <div className={`card-container ${card?.theme}-conic ${opponent ? "opponent" : ""} ${position} ${cardStyle} 
                ${(opponentAnimation?.state && opponentAnimation?.id === card?.id)
                    ? opponentAnimation?.name
                    : ""} ${card?.action?.animation}
                    ${deathAnimation ? "card-death" : ""}
                `}>

              {
                card?.action?.animation?.length
                  ? <CardDoTCover card={card} />
                  : null
              }

              <CardBackground opponent={opponent} card={card} />

              <CardEffectIconsBar card={card} />

              <CardActionCover round={round} card={card} />

              <CardImage animation={opponentAnimation} videoRef={videoRef} opponent={opponent} card={card} />

              <div className='card-stat-wrapper'>

                <CardName opponent={opponent} card={card} />
                {
                  cardStyle === "statList" ?
                  <CardStatList card={card} /> :
                  null
                }
                {
                  cardStyle === "battle" ?
                  <CardBattleStyle i={i} opponent={opponent} card={card} /> :
                  null
                }
              </div>
            </div>
    )
}

export default OpponentCard;