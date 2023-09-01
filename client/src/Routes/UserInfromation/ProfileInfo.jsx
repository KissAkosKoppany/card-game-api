import React from 'react';
import './ProfileInfo.css'
import ProfileDashBoard from './ProfileDashBoard';
import { useSelector } from 'react-redux';

const ProfileInfo = () => {

    const currentUser = useSelector((state) => state.rootReducer.user.currentUser)

  return (
    <div className='game-wrapper'>
    <div className="game-body">
      <div className='game-interface'>
        <ProfileDashBoard currentUser={currentUser} />
      </div>
    </div>
    </div>
  )
}

export default ProfileInfo;