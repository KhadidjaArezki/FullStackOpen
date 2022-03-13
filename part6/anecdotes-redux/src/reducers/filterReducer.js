import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(_, action) {
      const filter = action.payload
      return filter
    }
  }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer