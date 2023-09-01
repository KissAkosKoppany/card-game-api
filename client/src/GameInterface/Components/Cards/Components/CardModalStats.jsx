import React from 'react'
import CardStatIcon from '../../../../Components/Card/Components/StatStyle/CardStatIcon'

const CardModalStats = ({ card }) => {
  return (
    <div className="card-modal-stat-container">
                    <div className="card-modal-stat">
                        <p>Attack:</p>
                        <p>{card?.attack} <CardStatIcon statName={card?.type} /></p>
                    </div>
                    <div className="card-modal-stat">
                        <p>Hp:</p>
                        <p>{card?.hp} <CardStatIcon statName="hp" /></p>
                    </div>
                    <div className="card-modal-stat">
                        <p>Armor:</p>
                        <p>{card?.armor} <CardStatIcon statName="armor" /></p>
                    </div>
                    <div className="card-modal-stat">
                        <p>Magic resist:</p>
                        <p>{card?.magicResist} <CardStatIcon statName="magicResist" /></p>
                    </div>
                    <div className="card-modal-stat">
                        <p>Crit rate:</p>
                        <p>{card?.critRate}% <CardStatIcon statName="critRate" /></p>
                    </div>
                    <div className="card-modal-stat">
                        <p>Crit damage:</p>
                        <p>{card?.critDamage}% <CardStatIcon statName="critDamage" /></p>
                    </div>
    </div>
  )
}

export default CardModalStats