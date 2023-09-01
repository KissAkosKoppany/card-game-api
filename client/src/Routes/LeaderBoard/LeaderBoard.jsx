import React from 'react'
import SecondaryNav from '../../Components/SecondaryNav/SecondaryNav'
import { Route, Routes } from 'react-router-dom'
import PvPLeaderBoard from './Components/PvPLeaderBoard'

import './LeaderBoard.style.css'
import StoryModeLeaderBoard from './Components/StoryModeLeaderBoard'

const LeaderBoard = ({ socket }) => {

    let links = [
        {
          to: "/leaderboard",
          name: "Pvp",
          border: "border-none"
        },
        {
          to: "/leaderboard/story-mode",
          name: "Story mode",
          border: "border-none"
        },
      ]

  return (
    <div className='game-wrapper'>
      <div className="game-body">
        <div className='game-interface'>
            <SecondaryNav links={links} />
            <Routes>
                <Route path='/' element={<PvPLeaderBoard />} />
                <Route path='/story-mode' element={<StoryModeLeaderBoard />} />
            </Routes>
        </div>
      </div>
    </div>
  )
}

export default LeaderBoard