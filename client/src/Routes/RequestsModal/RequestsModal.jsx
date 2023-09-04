import React, { useEffect, useState } from 'react'

import BattleRequest from './Components/BattleRequest'

import { soundEffects } from '../../SoundEffects/soundEffects'

import './RequestsModal.style.css'

const RequestsModal = ({ socket }) => {

    const [battleRequests, setBattleRequests] = useState([])

    useEffect(() => {
        if(socket) {
            socket.on('battleRequest', (sender, room) => {
                soundEffects.request.play()
                setBattleRequests(requests => [...requests, {
                    id: sender.id,
                    image: sender.image,
                    username: sender.username,
                    room: room
                }])
            })
        }
    }, [socket])

    const clearRequest = (request) => {
        setBattleRequests(requests => requests.filter(battleRequest => battleRequest.id !== request.id))
    }

  return (
    <div className='requests-modal-container'>
        {
            battleRequests.length
                ? battleRequests.map(request => {
                    return (
                        <BattleRequest key={request.id} socket={socket} request={request} clearRequest={clearRequest} />
                    )
                })
                : null
        }
    </div>
  )
}

export default RequestsModal