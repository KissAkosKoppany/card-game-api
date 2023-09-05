import React from 'react'

import { Link } from 'react-router-dom'

import Card from '../../../../../Components/Card/Card'

const SelectedCards = ({ selectedCards, setFightingCards, resetCardSelect, link }) => {
  return (
    <> 
        <div className="card-select-container selected">
        {
            selectedCards.map(card => (
                <Card key={card?.id} card={card} cardStyle="statList" />
            ))
        }
        </div>
        <div className="card-confirmation">
            <button onClick={resetCardSelect} className="card-confirm-button">Select again</button>
            <Link to={link} ><button onClick={() => setFightingCards(selectedCards)} className="card-confirm-button">To Battle</button></Link>
        </div>
    </>
  )
}

export default SelectedCards