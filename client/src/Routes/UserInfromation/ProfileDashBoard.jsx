import React from 'react'

import { GiBossKey, GiShurikenAperture, GiSwordsPower, GiWilliamTellSkull, GiChampions } from 'react-icons/gi'

const ProfileDashBoard = ({ currentUser }) => {

    function calculateWinrate(battleWon, battlePlayed) {
        if(battleWon === 0) {
            return 0
        } else {
            return Math.floor((battleWon / battlePlayed) * 100);
        }
    }

    const storyModeWinrate = calculateWinrate(currentUser?.storyModeBattlesWon, currentUser?.storyModeBattlesPlayed)
    const pvpWinrate = calculateWinrate(currentUser?.pvpBattlesWon, currentUser?.pvpBattlesPlayed)

  return (
    <div className='profile-info-container'>
            <div className='user-info'>
                <div className='user-image'>
                    <img alt='profile-avatar' src={currentUser?.image} />
                </div>
                <p>{currentUser?.username}</p>
            </div>
            <div className='battle-info-container'>
                <div className='battle-statistics'>
                    <p>Story Mode</p>
                    <div className='battle-info'>
                        <p><span>Current stage: </span><span>{currentUser?.currentStageStoryMode} <GiBossKey /></span></p>
                        <p><span>Battles played: </span><span>{currentUser?.storyModeBattlesPlayed} <GiSwordsPower /></span></p>
                        <p><span>Battles won: </span><span>{currentUser?.storyModeBattlesWon} <GiChampions /></span></p>
                        <p><span>Battles lost: </span><span>{currentUser?.storyModeBattlesPlayed - currentUser?.storyModeBattlesWon} <GiWilliamTellSkull /></span></p>
                        <p><span>Winrate: </span><span>{storyModeWinrate}%</span></p>
                    </div>
                </div>
                <div className='battle-statistics'>
                    <p>PvP</p>
                    <div className='battle-info'>
                        <p><span>Points:</span><span> {currentUser?.pvpPoints} <GiShurikenAperture /></span></p>
                        <p><span>Battles played: </span><span>{currentUser?.pvpBattlesPlayed} <GiSwordsPower /></span></p>
                        <p><span>Battles won: </span><span>{currentUser?.pvpBattlesWon} <GiChampions /></span></p>
                        <p><span>Battles lost: </span><span>{currentUser?.pvpBattlesPlayed - currentUser?.pvpBattlesWon} <GiWilliamTellSkull /></span></p>
                        <p><span>Winrate:</span><span> {pvpWinrate}%</span></p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ProfileDashBoard