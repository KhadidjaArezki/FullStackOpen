import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  type: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(_, action) {
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

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer