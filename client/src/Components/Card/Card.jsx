import React, { useRef } from 'react';

import { useCardDeath } from '../../GameInterface/Components/Hooks/useCardDeath';

import CardName from './Components/CardName';
import CardImage from './Components/CardImage';
import CardDoTCover from './Components/BattleStyle/CardDoTCover';
import CardStatList from './Components/StatStyle/CardStatList';
import CardBackground from './Components/CardBackground';
import CardBattleStyle from './Components/BattleStyle/CardBattleStyle';
import CardActionCover from './Components/BattleStyle/CardActionCover';
import CardEffectIconsBar from './Components/BattleStyle/CardEffectIconsBar';

import { GiCardPlay } from 'react-icons/gi'

import './Card.css';

const Card = ({ card, cardStyle, round, opponent, room, pvp, isReferee, turn, inSequence, handleSetSequence, playerAnimation, i, position, socket }) => {

  const videoRef = useRef();

  const { deathAnimation } = useCardDeath(card?.hp)

    return (
            <div
            className={`card-container ${card?.theme}-conic ${opponent ? "opponent" : ""} ${position} ${cardStyle}
              ${(playerAnimation?.state && playerAnimation?.id === card?.id)
                ? playerAnimation?.name
                : ""} ${card?.action?.animation}
                ${deathAnimation ? "card-death" : ""}
            `}>

              {
                card?.action?.animation?.length
                  ? <CardDoTCover card={card} />
                  : null
              }

              {
                cardStyle === "select"
                  ? <div className="card-selected">
                      <GiCardPlay className="card-selected-icon" />
                    </div>
                  : null
              }

              <CardBackground animation={playerAnimation} opponent={opponent} card={card} />

              <CardEffectIconsBar card={card} />

              <CardActionCover round={round} card={card} />

              <CardImage animation={playerAnimation} opponent={opponent} socket={socket} videoRef={videoRef} card={card} />

              <div className='card-stat-wrapper'>

                <CardName opponent={opponent} card={card} />
                {
                  cardStyle === "statList" || cardStyle === "select" || cardStyle === "stagePreview one" || cardStyle === "stagePreview two" || cardStyle === "stagePreview three"
                  ? <CardStatList card={card} /> 
                  : null
                }
                {
                  cardStyle === "battle" ?
                  <CardBattleStyle pvp={pvp} socket={socket} i={i} room={room} inSequence={inSequence} isReferee={isReferee} turn={turn} videoRef={videoRef} handleSetSequence={handleSetSequence} opponent={opponent} card={card} /> :
                  null
                }
              </div>
            </div>
    )
}

export default Card;