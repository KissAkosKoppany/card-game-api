import React from 'react'
import CardStatIcon from './CardStatIcon'

const CardStat = ({ statName, statValue, theme }) => {
  return (
    <div className='card-stat-container'>
        <div className={`card-stat-decor left ${theme}`}></div>
        <div className={`card-stat-decor right ${theme}`}></div>
        <div className='card-stat'>
          <CardStatIcon statName={statName} />
          <p>{statValue}</p>
        </div>
    </div>
  )
}

export default CardStat