import React, { useEffect, useState } from 'react'
import UserList from './UserList'
import { useSelector } from 'react-redux'

const PvPLeaderBoard = () => {

    const users = useSelector(state => state.rootReducer.user.allUsers)

    const [usersList, setUsersList] = useState(users.sort((a,b) => b.pvpPoints - a.pvpPoints))

    useEffect(() => {
        setUsersList(users.sort((a,b) => b - a))
    }, [])

  return (
    <div className='friends-wrapper'>
        <UserList users={usersList} mode='info-pvp' />
    </div>
  )
}

export default PvPLeaderBoard