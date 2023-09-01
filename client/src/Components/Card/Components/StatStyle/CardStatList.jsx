import React from 'react'
import CardStat from './CardStat';

const CardStatList = ({ card }) => {

  return (
    <>
        <div className='card-stat-container-left'>

            <CardStat statName={card?.damageType} statValue={card?.attack} theme={card?.theme}/>
            <CardStat statName="magicResist" statValue={card?.magicResist} theme={card?.theme}/>
            <CardStat statName="critRate" statValue={`${card?.critRate}%`} theme={card?.theme}/>

        </div>

        <div className='card-stat-container-right'>
            
            <CardStat statName="hp" statValue={card?.hp} theme={card?.theme}/>
            <CardStat statName="armor" statValue={card?.armor} theme={card?.theme}/>
            <CardStat statName="critDamage" statValue={`${card?.critDamage}%`} theme={card?.theme}/>

        </div>
    </>
  )
}

export default CardStatList