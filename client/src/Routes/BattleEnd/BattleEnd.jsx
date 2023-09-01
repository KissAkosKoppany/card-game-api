import React from 'react'
import './BattleEnd.style.css'
import BattleEndStoryMode from './Components/BattleEndStoryMode'
import BattleEndPvP from './Components/BattleEndPvP'
import { useSelector } from 'react-redux'

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