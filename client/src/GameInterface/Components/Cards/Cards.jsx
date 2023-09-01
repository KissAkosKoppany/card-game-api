import React from 'react';
import './Cards.css';
import { Routes, Route } from 'react-router-dom';
import SecondaryNav from '../../../Components/SecondaryNav/SecondaryNav';
import AllCards from './Containers/AllCards';
import MyCards from './Containers/MyCards';
// import { CardContext } from '../../../contexts/card.context'
import { useSelector } from 'react-redux';


const Cards = () => {

  const cards = useSelector((state) => state.rootReducer.cards.cards)
  const bossCards = useSelector((state) => state.rootReducer.cards.bossCards)

  const links = [
    {
      to: "/cards",
      name: "Battle Cards",
      border: "border-none"
    },
    {
      to: "/cards/boss-cards",
      name: "Boss Cards",
      border: "border-none"
    },
    {
      to: "/cards/my-cards",
      name: "My Cards",
      border: "border-none"
    }
  ]

  return (
    <div className='game-wrapper'>
      <div className="game-body">
        <div className='game-interface'>
          <SecondaryNav links={links} />
          <div className='game-content-container cards-container'>
            <Routes>
              <Route path='/' element={<AllCards cards={cards} />} />
              <Route path='boss-cards' element={<AllCards cards={bossCards} />} />
              <Route path='my-cards' element={<MyCards />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards;