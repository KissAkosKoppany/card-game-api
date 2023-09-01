import React from 'react'
import { GiTrophy, GiWilliamTellSkull, GiShurikenAperture } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { useLoadUserInfo } from '../../../hooks/useLoadUserInfo'
import { useSelector } from 'react-redux'

const BattleEndPvP = ({ battle }) => {

  useLoadUserInfo()
  const players = useSelector(state => state.rootReducer.battle.pvpPlayers)
  console.log('players', players)

  return (
    <div className='battle-end-container'>
        <div className="battle-end-title">
            {
                battle.won
                ? <>
                    <GiTrophy />
                    <h1>Victory</h1>
                    <GiTrophy />
                  </>
                : <>
                    <GiWilliamTellSkull />
                    <h1>Defeat</h1>
                    <GiWilliamTellSkull />
                  </>
            }
        </div>
        <div className="battle-end-dashboard">
            <p>{players?.playerName} vs. {players?.opponentName}</p>
            <p>Points: {battle?.pvpPoints} <span><GiShurikenAperture /></span></p>
            <Link to='/fight/pvp'><button>Find Opponent</button></Link>
        </div>
    </div>
  )
}

export default BattleEndPvP