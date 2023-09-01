import React from 'react'
import { GiHearts, GiBroadsword, GiLunarWand } from 'react-icons/gi';

const CardBattleStats = ({ card, opponent, battleCard }) => {

  return (
    <div className={`card-battle-stats-wrapper ${opponent ? "opponent" : ""}`}>

        <div className="card-battle-attack-container">
          {
            card?.damageType === "ad" ?
              <GiBroadsword className='card-battle-attack-icon' />
              :
              <GiLunarWand className='card-battle-attack-icon' />
          }
          <div className="card-battle-attack-bar-container">
            <div className={`card-battle-attack-border ${card?.theme}`}></div>
            <div className={`card-battle-attack-border right ${card?.theme}`}></div>
            <p className="card-battle-attack">{card?.attack}</p>
          </div>
        </div>

        <div className="card-battle-hp-container">
          <GiHearts className='card-battle-hp-icon' />
          <div className="card-battle-hp-bar-container">
            <div className={`card-battle-hp-border ${card?.theme}`}></div>
            <div className={`card-battle-hp-border right ${card?.theme}`}></div>
            <div className="card-battle-hp-bar">
              <div style={{width: `${(card?.hp / card?.maxHp) * 100}%`}} className={`hp-bar-indicator ${card?.theme}`}></div>
            </div>
            <p className="card-battle-hp">{card?.hp} / {card?.maxHp}</p>
          </div>
        </div>

      </div>
  )
}

export default CardBattleStats