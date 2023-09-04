import React from 'react'

import { setPvpPlayers } from '../../../store/battle/battle.action'
import { useDispatch, useSelector } from 'react-redux'

import { soundEffects } from '../../../SoundEffects/soundEffects'
import { GiCrossedSwords, GiBoltEye } from 'react-icons/gi'

const UserActionButtons = ({ user, mode, socket, openPlayerInfo }) => {

  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.rootReducer.user.currentUser)

  const sendBattleRequest = () => {
    socket.emit('sendRequest', user.id, currentUser)
    dispatch(setPvpPlayers({
      playerName: currentUser.username,
      opponentName: user.username
    }))
    soundEffects.success.play()
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