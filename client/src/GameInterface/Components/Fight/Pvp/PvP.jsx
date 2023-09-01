import React from 'react'
import './Pvp.style.css'
import { Routes, Route } from 'react-router-dom'
import PvpOnlinePlayers from './Components/PvpOnlinePlayers'
import PvpCardSelect from './Components/PvpCardSelect'
import PvpWaitingForOpponent from './Components/PvpWaitingForOpponent'
import PvpBattle from './Components/PvpBattle'

const PvP = ({ socket, battleMode, setBattleMode }) => {

  return (
    <div className={`${battleMode ? "" : "pvp-wrapper"}`}>
      <Routes>
        <Route path='/' element={<PvpOnlinePlayers socket={socket} />} />
        <Route path='/card-select' element={<PvpCardSelect socket={socket} />} />
        <Route path='/waiting-for-opponent' element={<PvpWaitingForOpponent />} />
        <Route path='/battle' element={<PvpBattle setBattleMode={setBattleMode} socket={socket} />} />
      </Routes>
    </div>
  )
}

export default PvP