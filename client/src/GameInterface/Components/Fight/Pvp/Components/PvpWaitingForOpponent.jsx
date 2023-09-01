import React from 'react'

const PvpWaitingForOpponent = () => {
  return (
    <div className='pvp-waiting'>
        <div className="pvp-waiting-text">
            <p>Waiting</p>
            <p>for</p>
            <p>opponent</p>
        </div>
        <div className="dot-animation">
            <p className="dot1">.</p>
            <p className="dot2">.</p>
            <p className="dot3">.</p>
        </div>
    </div>
  )
}

export default PvpWaitingForOpponent