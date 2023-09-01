import React, { useCallback, useEffect } from 'react'
import './NotificationModal.style.css'
import Notification from './Component/Notification'
import uuid from 'react-uuid'
import { useDispatch, useSelector } from 'react-redux'
import { setNotifications } from '../../store/notifications/notifications.action'

const NotificationModal = ({ socket }) => {

  const dispatch = useDispatch()
  const notifications = useSelector(state => state.rootReducer.notifications.notifications)
  
  const clearNotifications = useCallback((notification) => {
    dispatch(setNotifications(notifications.filter(notif => notif.id !== notification.id)))
  }, [dispatch, notifications])

  const handleNotifications = useCallback((message) => {
    let notification = {
      id: uuid(),
      message: message
    }
    dispatch(setNotifications([...notifications, notification]))
    setTimeout(() => {
      clearNotifications(notification)
    }, 4000)
  }, [dispatch, notifications, clearNotifications])


  useEffect(() => {
    if(socket) {
      socket.on('notifyBattleRejected', () => {
        handleNotifications(`Battle rejected!`)
      })
    }
  }, [socket, handleNotifications])

  return (
    <div className='notification-container'>
      {
        notifications.length
          ? notifications.map(notif => (
              <Notification notifications={notifications} key={notif.id} notif={notif} />
          )) 
          : null
      }
        
    </div>
  )
}

export default NotificationModal