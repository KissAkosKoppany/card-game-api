import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setPlayerBattleCards } from '../../../../../store/cards/cards.action'

import SelectedCards from '../Components/SelectedCards'
import CardSelectSlider from '../Components/CardSelectSlider'

import { soundEffects } from '../../../../../SoundEffects/soundEffects'

import './CardSelect.style.css'

const CardSelect = () => {

    const dispatch = useDispatch()
    const cards = useSelector((state) => state.rootReducer.cards.cards)

    const setFightingcards = (cards) => {
        soundEffects.accept.play()
        dispatch(setPlayerBattleCards(cards))
    }

    const [cardSelectList, setCardSelectList] = useState(cards)
    const [selectedCards, setSelectedCards] = useState([])

    const handleCardSelect = (card) => {
        soundEffects.select.play()
        setSelectedCards([...selectedCards, card])
        setCardSelectList(cards => cards.filter(item => item.id !== card.id))
    }

    const resetCardSelect = () => {
        soundEffects.decline.play()
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