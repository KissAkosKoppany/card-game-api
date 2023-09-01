import React from 'react'
import { Routes, Route } from 'react-router-dom'
import StageOne from './Stages/StageOne'
import StagesContainer from './Container/StagesContainer'
import CardSelect from './Container/CardSelect'

const StoryMode = ({ setBattleMode }) => {

  // useEffect(() => {
  //   setBattleMode(false)
  // }, [])

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