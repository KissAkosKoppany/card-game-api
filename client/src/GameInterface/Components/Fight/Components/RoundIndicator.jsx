import React from 'react'

const RoundIndicator = ({ round }) => {
  return (
    <div className={`round-indicator`}>
      <div className="round-indicator-bg">
        <p>ROUND {round}</p>
      </div>
    </div>
  )
}

export default RoundIndicator