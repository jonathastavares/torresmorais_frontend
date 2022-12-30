import { createSlice } from '@reduxjs/toolkit'

export const personalSlice = createSlice({
  name: 'personal',
  initialState: {
    name: '',
    address: '',
  },
  reducers: {
    setName: (state, action) => {
        return { name: action.payload, address: state.address };
    },
    setAddress: (state, action) => {
        return { name: state.name, address: action.payload };
    },
  },
})

// Action creators are generated for each case reducer function
export const { setName, setAddress } = personalSlice.actions

export default personalSlice.reducer