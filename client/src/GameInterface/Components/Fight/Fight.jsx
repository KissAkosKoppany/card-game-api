import React from 'react';
import './Fight.css';
import { Routes, Route } from 'react-router-dom';
import SecondaryNav from '../../../Components/SecondaryNav/SecondaryNav';

import StoryMode from './StoryMode/StoryMode';
import PvP from './Pvp/PvP';
// import { useStages } from '../../../hooks/useStages';

const Fight = ({ battleMode, setBattleMode, socket }) => {

  // const { stages } = useStages()

  let links = [
    {
      to: "/fight/story-mode",
      name: "Story mode",
      border: "border-none"
    },
    {
      to: "/fight/pvp",
      name: "PvP",
      border: "border-none"
    }
  ]

  return (
    <div className={`game-wrapper ${battleMode ? "battle-mode" : ""}`}>
    <div className={`game-body ${battleMode ? "battle-mode" : ""}`}>
      <div className={`game-interface ${battleMode ? "battle-mode" : ""}`}>
          <SecondaryNav links={links} battleMode={battleMode} />
          <div className={`game-content-container ${battleMode ? "battle-mode" : ""}`}>
          <Routes>
              <Route path='story-mode/*' element={<StoryMode setBattleMode={setBattleMode} />}/>
              <Route path='pvp/*' element={<PvP setBattleMode={setBattleMode} battleMode={battleMode} socket={socket} />}/>
          </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fight;