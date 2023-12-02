import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  type: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(_, action) {
      return {
        message: action.payload.message,
        type: action.payload.type
      }
    },
    removeNotification(_, action) {
      return ({
        message: '',
        type: ''
      })
    }
  }
})

export const { displayNotification, removeNotification } = notificationSlice.actions
export const setNotification = (notification, timeout) => {
  return async dispatch => {
    dispatch(displayNotification(notification))
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeout * 1000)
  }
}
export default notificationSlice.reducer