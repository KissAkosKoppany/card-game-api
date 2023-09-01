import React from 'react'

const CardName = ({ card, opponent }) => {

  return (
    <div className={`card-stat-container card-name ${opponent ? "opponent" : ""}`}>
        <div className={`card-stat-decor left ${card?.theme}`}></div>
        <div className={`card-stat-decor right ${card?.theme}`}></div>
        <p>{card?.name}</p>
    </div>
  )
}

export default CardName