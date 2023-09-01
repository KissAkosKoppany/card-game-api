import React from 'react'
import { GiCrossedSwords } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { setPvpReferee } from '../../../store/pvp/pvp.action'
import { setPvpPlayers } from '../../../store/battle/battle.action'

const BattleRequest = ({ request, socket, clearRequest }) => {

  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.rootReducer.user.currentUser)
  console.log('request for sendername',request)

  const acceptBattle = () => {
    socket.emit('battleRequestAccepted', request.room, request.id)
    dispatch(setPvpReferee(request.id))
    dispatch(setPvpPlayers({
      playerName: currentUser.username,
      opponentName: request.username
    }))

  }

  const rejectBattle = () => {
    socket.emit('battleRejected', request.room)
  }

  return (
    <div className="request-modal">
      <div className='request-modal-bg'>
        <GiCrossedSwords className='request-icon' />
      </div>
      <div className="request-sender-info">
        <div className="request-img">
          <img alt='sender' src={request.image} />
        </div>
        <p>{request.username}</p>
      </div>
      <div className="request-buttons">
        <button onClick={() => {
          acceptBattle()
          clearRequest(request)
        }}>Accept</button>
        <button onClick={() => {
          rejectBattle()
          clearRequest(request)
        }}>Decline</button>
      </div>
    </div>
  )
}

export default BattleRequest