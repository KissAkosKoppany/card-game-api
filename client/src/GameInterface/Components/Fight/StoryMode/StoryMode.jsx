import React from 'react'

import { Routes, Route } from 'react-router-dom'

import StageOne from './Stages/StageOne'
import CardSelect from './Container/CardSelect'
import StagesContainer from './Container/StagesContainer'

const StoryMode = ({ setBattleMode }) => {
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<StagesContainer setBattleMode={setBattleMode} />}/>
        <Route path='stage-one' element={<StageOne setBattleMode={setBattleMode} />}/>
        <Route path='card-select' element={<CardSelect />} />
      </Routes>
    </div>
  )
}

export default StoryMode