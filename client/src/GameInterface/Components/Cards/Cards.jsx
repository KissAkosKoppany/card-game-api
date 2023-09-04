import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';

import AllCards from './Containers/AllCards';
import SecondaryNav from '../../../Components/SecondaryNav/SecondaryNav';

import './Cards.css';

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
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards;