import React, { useState } from 'react'

import { soundEffects } from '../../../../../SoundEffects/soundEffects'
import { useDispatch, useSelector } from 'react-redux'
import { setOpponentBattleCards, setPlayerBattleCards } from '../../../../../store/cards/cards.action'

import SelectedCards from '../../StoryMode/Components/SelectedCards'
import CardSelectSlider from '../../StoryMode/Components/CardSelectSlider'

import '../../StoryMode/Container/CardSelect.style.css'

const PvpCardSelect = ({ socket }) => {

    const dispatch = useDispatch()
    const cards = useSelector((state) => state.rootReducer.cards.cards)
    const room = useSelector(state => state.rootReducer.pvp.pvpRoom)
    const refereeId = useSelector(state => state.rootReducer.pvp.pvpReferee)
    const currentUser = useSelector(state => state.rootReducer.user.currentUser)

    const setFightingcards = (cards) => {
        soundEffects.accept.play()
        const isReferee = refereeId === currentUser.id
        if(isReferee) {
            dispatch(setPlayerBattleCards(cards))
        } else {
            dispatch(setOpponentBattleCards(cards))
        }
        socket.emit('playerReady', cards, room, isReferee)
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
                ? <SelectedCards link='/fight/pvp/waiting-for-opponent' selectedCards={selectedCards} setFightingCards={setFightingcards} resetCardSelect={resetCardSelect} />
                : <CardSelectSlider handleCardSelect={handleCardSelect} cardSelectList={cardSelectList} />
        }
    </div>
  )
}

export default PvpCardSelect