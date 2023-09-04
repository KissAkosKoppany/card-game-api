import React, { useCallback, useEffect, useState } from 'react'

import { useSelector } from 'react-redux';

import UserList from './UserList';

const StoryModeLeaderBoard = () => {

    const users = useSelector(state => state.rootReducer.user.allUsers)

    const [usersList, setUsersList] = useState(users.sort((a,b) => b.currentStageStoryMode - a.currentStageStoryMode))

    const handleUsers = useCallback(() => {
      setUsersList(users.sort((a,b) => b.currentStageStoryMode - a.currentStageStoryMode))
    }, [users])

    useEffect(() => {
      handleUsers()
    }, [handleUsers])

  return (
    <div className='friends-wrapper'>
        <UserList users={usersList} mode='info-story' />
    </div>    
  )
}

export default StoryModeLeaderBoard