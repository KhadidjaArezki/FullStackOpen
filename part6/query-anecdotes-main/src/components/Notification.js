import React from 'react'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: 'none'
  }
  
  const [notification, notificationDispatch] = useContext(NotificationContext)
  console.log(notification)

  if (notification !== "") {
    style.display = 'block'
    setTimeout(() => {
      notificationDispatch({ type: "REMOVE" })
    }, 5000)
  }
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
