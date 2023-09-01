import React from 'react'
import { GiCrossedSwords, GiBoltEye } from 'react-icons/gi'

import { useDispatch, useSelector } from 'react-redux'
import { setPvpPlayers } from '../../../store/battle/battle.action'

const UserActionButtons = ({ user, mode, socket, openPlayerInfo }) => {

  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.rootReducer.user.currentUser)

  const sendBattleRequest = () => {
    socket.emit('sendRequest', user.id, currentUser)
    dispatch(setPvpPlayers({
      playerName: currentUser.username,
      opponentName: user.username
    }))
  }

  return (
    <div className='user-action-buttons-container'>
        {
          mode === "battle"
            ? <> 
                <p onClick={sendBattleRequest} className='user-action-button'>
                  <GiCrossedSwords />
                </p>
                <p onClick={async() => openPlayerInfo(user.id)} className='user-action-button'>
                  <GiBoltEye />
                </p>
                {/* <p className='user-action-button'>
                  <GiChatBubble />
                </p> */}
              </>
            : null
        }
        {
          mode === "info-pvp" || mode === 'info-story'
            ? <>
                <p onClick={async() => openPlayerInfo(user.id)} className='user-action-button'>
                  <GiBoltEye />
                </p>
                {/* <p className='user-action-button'>
                  <GiChatBubble />
                </p> */}
              </>
            : null
        }
    </div>
  )
}

export default UserActionButtons