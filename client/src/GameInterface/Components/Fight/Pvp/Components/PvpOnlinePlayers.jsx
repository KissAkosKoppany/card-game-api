import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import UserList from '../../../../../Routes/LeaderBoard/Components/UserList'
import SearchUsers from '../../../../../Routes/LeaderBoard/Components/SearchUsers'

const PvpOnlinePlayers = ({socket}) => {

    const users = useSelector(state => state.rootReducer.user.allUsers)
    const currentUser = useSelector(state => state.rootReducer.user.currentUser)

    const [usersList, setUsersList] = useState(users.filter(user => user.isOnline && user.id !== currentUser.id))

    useEffect(() => {
      setUsersList(users.filter(user => user.isOnline && user.id !== currentUser.id))
    }, [users])

  return (
    <div className='pvp-players'>
        <SearchUsers setUsers={setUsersList} usersList={users} />
        {
          usersList.length
            ? <UserList users={usersList} socket={socket} mode='battle' />
            : <h2 className='no-users'>No online users</h2>
        }
    </div>
  )
}

export default PvpOnlinePlayers