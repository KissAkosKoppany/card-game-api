import React, { useCallback, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import UserList from './UserList'

const PvPLeaderBoard = () => {

    const users = useSelector(state => state.rootReducer.user.allUsers)

    const [usersList, setUsersList] = useState(users.sort((a,b) => b.pvpPoints - a.pvpPoints))

    const handleUsers = useCallback(() => {
      setUsersList(users.sort((a,b) => b - a))
    }, [users])

    useEffect(() => {
      handleUsers()
    }, [handleUsers])

  return (
    <div className='friends-wrapper'>
        <UserList users={usersList} mode='info-pvp' />
    </div>
  )
}

export default PvPLeaderBoard