import React from 'react'
import Card from '../../../../Components/Card/Card'
import CardModalStats from './CardModalStats'
import { GiCrossMark } from 'react-icons/gi'

const CardModal = ({ card, setShowCardModal }) => {
  return (
    <div className='card-modal-wrapper'>
        <div className={`card-modal-container`}>
            <button onClick={() => setShowCardModal(false)} className="card-modal-close-button"><GiCrossMark /></button>
            <Card card={card} opponent={true} cardStyle="statList modal" />
            <div className={`card-modal-info-container ${card?.theme}`}>
                <div className="card-modal-info-bg"></div>
                <h1 className="card-modal-title">Stats</h1>
                <CardModalStats card={card} />
                <div className="card-modal-skill">
                  <h2 className="card-modal-skill-title">Active Skill</h2>
                  <div className="card-modal-skill-description">
                    {card.skill.map((skillDescription, i) => (
                      <p key={i}>{skillDescription}</p>
                    ))}
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardModal