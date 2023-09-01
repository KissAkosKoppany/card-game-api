import React, { useState } from 'react'
import UserActionButtons from './UserActionButtons'
import { httpGetPlayerInfo } from '../../../hooks/requests'
import ProfileDashBoard from '../../UserInfromation/ProfileDashBoard'
import { GiCrossMark, GiBossKey, GiShurikenAperture } from 'react-icons/gi'

const UserList = ({ users, mode, socket }) => {

    const [showModal, setShowModal] = useState(false)
    const [player, setPlayer] = useState(null)

    const openPlayerInfo = async(id) => {
        const playerInfo = await httpGetPlayerInfo(id)
        setPlayer(playerInfo)
        setShowModal(true)
    }
  return (
    <div className="users-container">
            {
                users.map((user, i) => {
                    return (
                        <div key={user?.id} className="user-bar-wrapper">
                            <div className={`online-indicator ${user?.isOnline ? "online": ""}`}></div>
                            <div className="user-bar">
                                <div className="user-bar-img-name">
                                    {
                                        mode === 'info-pvp' || mode === 'info-story'
                                            ? <p className='leaderboard-rank'>{i+1}.</p>
                                            : null
                                    }
                                    <div className='user-bar-image'>
                                        <img src={user?.image} alt="profile" />
                                    </div>
                                    <p className="user-bar-username">{user?.username}</p>
                                </div>
                                {
                                    mode === 'info-pvp'
                                        ? <p className='leaderboard-points'>{user?.pvpPoints} <GiShurikenAperture /></p>
                                        : null
                                }
                                {
                                    mode === 'info-story'
                                        ? <p className='leaderboard-points'>{user?.currentStageStoryMode} <GiBossKey /></p>
                                        : null
                                }
                                <UserActionButtons user={user} mode={mode} socket={socket} openPlayerInfo={openPlayerInfo} />
                            </div>
                        </div>
                    )
                })
            }
            {
                showModal
                    ? <div className='profile-modal'>
                        <button onClick={() => setShowModal(false)} className="modal-close-button"><GiCrossMark /></button>
                        <ProfileDashBoard currentUser={player} />
                      </div>
                    : null
            }
    </div>
  )
}

export default UserList