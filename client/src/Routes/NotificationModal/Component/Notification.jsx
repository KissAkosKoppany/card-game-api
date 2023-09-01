import React, { useEffect, useState } from 'react'

const Notification = ({ notif, notifications }) => {
  
  const [animation, setAnimation] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setAnimation(true)
    }, 500)
  }, [notifications])

  return (
    <div className={`notification ${animation ? 'animation' : ''}`}>
        <p>{notif.message}</p>
    </div>
  )
}

export default Notification