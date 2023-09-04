import React from 'react';

import { Routes, Route } from 'react-router-dom';

import PvP from './Pvp/PvP';
import StoryMode from './StoryMode/StoryMode';
import SecondaryNav from '../../../Components/SecondaryNav/SecondaryNav';

import './Fight.css';

const Fight = ({ battleMode, setBattleMode, socket }) => {

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