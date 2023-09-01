import React, { useEffect, useState } from 'react'
import UserList from './UserList';
import { useSelector } from 'react-redux';

const StoryModeLeaderBoard = () => {

    const users = useSelector(state => state.rootReducer.user.allUsers)

    const [usersList, setUsersList] = useState(users.sort((a,b) => b.currentStageStoryMode - a.currentStageStoryMode))

    useEffect(() => {
        setUsersList(users.sort((a,b) => b.currentStageStoryMode - a.currentStageStoryMode))
    })

  return (
    <div className='friends-wrapper'>
        <UserList users={usersList} mode='info-story' />
    </div>    
  )
}

export default StoryModeLeaderBoard