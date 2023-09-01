import React, { useRef } from 'react'

const SearchUsers = ({ usersList, setUsers }) => {

  const searchfieldRef = useRef()

    const handleUserSearch = (e) => {
        if(e.key === 'Enter') {
            setUsers(usersList.filter(user => user.username.toLowerCase().includes(searchfieldRef.current.value)))
        }
    }

  return (
    <div className="search-user-container">
        <div className="input-bg"></div>
        <input ref={searchfieldRef} onKeyDown={handleUserSearch} type='text' placeholder='Search a user...' />
    </div>
  )
}

export default SearchUsers