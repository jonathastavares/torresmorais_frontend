import { createSlice } from '@reduxjs/toolkit'

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState: {
    hash: null,
  },
  reducers: {
    setItem: (state, action) => {
        return { hash: action.payload };
    },
  },
})

// Action creators are generated for each case reducer function
export const { setItem } = navbarSlice.actions

export default navbarSlice.reducer