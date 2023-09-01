import React from 'react'

const CardBackground = ({ card, opponent }) => {


  return (
    <div className='card-bg '>
        <div className={`card-triangle-top ${card?.theme}-triangle`}></div>
        <div className='card-triangle-bottom'></div>
        <div className={`card-side-decor left ${opponent ? "opponent" : ""}`}>
            <div className={`card-decor-line ${card?.theme}-border ${(card?.skillCharge === 1 || card?.skillCharge === 2 || card?.skillCharge === 3 || card?.skillCharge === 4) ? `${card?.theme}` : ""}`}></div>
            <div className={`card-decor-line ${card?.theme}-border ${(card?.skillCharge === 2 || card?.skillCharge === 3 || card?.skillCharge === 4) ? `${card?.theme}` : ""}`}></div>
            <div className={`card-decor-line ${card?.theme}-border ${(card?.skillCharge === 3 || card?.skillCharge === 4) ? `${card?.theme}` : ""}`}></div>
            { card?.skillCount === 4 ?
              <div className={`card-decor-line ${card?.theme}-border ${card?.skillCharge === 4 ? `${card?.theme}` : ""}`}></div>
                :
              null
            }
        </div>
        <div className={`card-side-decor right ${opponent ? "opponent" : ""}`}>
            <div className={`card-decor-line ${card?.theme}-border ${(card?.skillCharge === 1 || card?.skillCharge === 2 || card?.skillCharge === 3 || card?.skillCharge === 4) ? `${card?.theme}` : ""}`}></div>
            <div className={`card-decor-line ${card?.theme}-border ${(card?.skillCharge === 2 || card?.skillCharge === 3 || card?.skillCharge === 4) ? `${card?.theme}` : ""}`}></div>
            <div className={`card-decor-line ${card?.theme}-border ${(card?.skillCharge === 3 || card?.skillCharge === 4) ? `${card?.theme}` : ""}`}></div>
            { card?.skillCount === 4 ?
              <div className={`card-decor-line ${card?.theme}-border ${card?.skillCharge === 4 ? `${card?.theme}` : ""}`}></div>
                :
              null
            }
        </div>
    </div>
  )
}

export default CardBackground