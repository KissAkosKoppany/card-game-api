import React, { useEffect } from 'react'

const CardImage = ({ card, opponent, videoRef, animation, socket }) => {

  useEffect(() => {
    if(socket) {
      socket.on('playSkillVideo', cardId => {
        if(cardId === card.id) {
          setTimeout(() => {
            videoRef.current.play()
            // 2600
          }, 1700)
        }
      })
    }
    // eslint-disable-next-line
  }, [socket])

  return (
    <div className={`img-container ${opponent ? "opponent" : ""}
      ${(animation?.state && animation?.id === card?.id)
        ? animation?.name
        : ""}`}>
        <div className={`card-img-bg ${card?.theme}`}></div>
        <img className={`card-img`} alt='yeee' src={card?.image} />        
        <video ref={videoRef} className={`card-img card-skill-video ${(animation?.state && animation?.id === card?.id) ? animation?.name : ""}`}>
          <source src={card?.video} type='video/mp4' />
        </video>
    </div>
  )
}

export default CardImage