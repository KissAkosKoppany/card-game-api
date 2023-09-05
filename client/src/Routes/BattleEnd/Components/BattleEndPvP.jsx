import React from 'react'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLoadUserInfo } from '../../../hooks/useLoadUserInfo'

import { GiTrophy, GiWilliamTellSkull, GiShurikenAperture } from 'react-icons/gi'

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
                    <p>Victory</p>
                    <GiTrophy />
                  </>
                : <>
                    <GiWilliamTellSkull />
                    <p>Defeat</p>
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