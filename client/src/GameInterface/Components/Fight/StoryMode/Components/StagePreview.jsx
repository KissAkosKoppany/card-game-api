import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../../../../../Components/Card/Card'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setOpponentBattleCards } from '../../../../../store/cards/cards.action'
import { setBattleEnd } from '../../../../../store/battle/battle.action'


const StagePreview = ({ stage, setBattleMode }) => {

  const dispatch = useDispatch()
  const bossCards = useSelector((state) => state.rootReducer.cards.bossCards)

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
    <div onClick={() => {setBattleMode(true); handleBossSelect()}} className="stage-preview-container">
          {/* this will link to cardSelect...and will set an app state to link to proper stage with onclick*/}
          <Link className='stage-link' to="/fight/story-mode/card-select"></Link>
          {/* <img src={stage.img} alt="stage-preview" className="stage-preview-img" /> */}
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