import React, { useState } from 'react'
// import { CardContext } from '../../../../../contexts/card.context'
import './CardSelect.style.css'

import { useDispatch, useSelector } from 'react-redux'

import SelectedCards from '../Components/SelectedCards'
import CardSelectSlider from '../Components/CardSelectSlider'
import { setPlayerBattleCards } from '../../../../../store/cards/cards.action'



const CardSelect = () => {

    const dispatch = useDispatch()
    const cards = useSelector((state) => state.rootReducer.cards.cards)

    const setFightingcards = (cards) => {
        dispatch(setPlayerBattleCards(cards))
    }

    const [cardSelectList, setCardSelectList] = useState(cards)
    const [selectedCards, setSelectedCards] = useState([])

    const handleCardSelect = (card) => {
        setSelectedCards([...selectedCards, card])
        setCardSelectList(cards => cards.filter(item => item.id !== card.id))
    }

    const resetCardSelect = () => {
        setSelectedCards([]);
        setCardSelectList(cards)
    }

  return (
    <div className="card-select-wrapper">
        {
            selectedCards.length === 4
                ? <SelectedCards link='/fight/story-mode/stage-one' selectedCards={selectedCards} setFightingCards={setFightingcards} resetCardSelect={resetCardSelect} />
                : <CardSelectSlider handleCardSelect={handleCardSelect} cardSelectList={cardSelectList} />
        }
    </div>
  )
}

export default CardSelect