import React from 'react'
import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case "ADD":
      return `anecdote '${action.payload}' created`
      
    case "VOTE":
      return `anecdote '${action.payload}' voted`
   
    case "REMOVE":
      return ""
      
    case "ERROR":
      return `Error: ${action.payload}`
    
    default:
      return ""
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, "")

  return (
    <NotificationContext.Provider value={ [notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext

