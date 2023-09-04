import React from 'react'

import { useSelector } from 'react-redux'

import BattleEndPvP from './Components/BattleEndPvP'
import BattleEndStoryMode from './Components/BattleEndStoryMode'

import './BattleEnd.style.css'

const BattleEnd = ({ setBattleMode }) => {

    const battle = useSelector(state => state.rootReducer.battle.battleEnd)

  return (
    <div className='game-wrapper'>
        <div className="game-body">
            <div className='game-interface'>
                {
                    battle.mode === 'pvp'
                        ? <BattleEndPvP battle={battle} />
                        : <BattleEndStoryMode setBattleMode={setBattleMode} battle={battle} />
                }  
            </div>
        </div>
    </div>
  )
}

export default BattleEnd