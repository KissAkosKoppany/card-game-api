import React from 'react'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setBattleEnd } from '../../../../../store/battle/battle.action'
import { setOpponentBattleCards } from '../../../../../store/cards/cards.action'

import { GiPadlock } from 'react-icons/gi'

import Card from '../../../../../Components/Card/Card'

const StagePreview = ({ stage, setBattleMode }) => {

  const dispatch = useDispatch()
  const bossCards = useSelector((state) => state.rootReducer.cards.bossCards)
  const currentUser = useSelector(state => state.rootReducer.user.currentUser)

  const getSelectedCard = (cardName) => bossCards.filter(card => card.name === cardName)

  const setSelectedCards = (cards) => {
    return cards.map(cardName => {
      return getSelectedCard(cardName)
    }).flat()
  }

  const currentStageCards = setSelectedCards(stage.cards)
  const nextStageCards = setSelectedCards(stage.nextStageCards)

  const handleBossSelect = () => {
    dispatch(setOpponentBattleCards(currentStageCards))
    dispatch(setBattleEnd({
      mode: 'story',
      stageNumber: stage.stageNumber,
      won: false,
      currentStageCards: currentStageCards,
      nextStageCards: nextStageCards,
    }))
  }

  return (
    <div className="stage-preview-container">
          {
            currentUser.currentStageStoryMode < stage.stageNumber
              ? <div className="stage-lock"><GiPadlock /></div>
              : null
          }
          <Link onClick={() => {setBattleMode(true); handleBossSelect()}} className='stage-link' to="/fight/story-mode/card-select"></Link>
          <div className="stage-preview-cards-container">
            {
              currentStageCards.map((card, i) => (
                <Card key={card.id} card={card} opponent={false} cardStyle={stage?.cardStyle[i]} />
              ))
            }
          </div>
          <div className="card-preview-title-container">
            <p className="stage-preview-title">{stage?.title}</p>
          </div>
    </div>
  )
}

export default StagePreview