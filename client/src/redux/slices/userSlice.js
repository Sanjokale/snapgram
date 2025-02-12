import { createSlice } from '@reduxjs/toolkit'

const initialState = { userDetails: {} }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      // return {
      //   ...state,
      //  userDetails:  {...state.userDetails, ...action.payload}
      // }
      state.userDetails = {...state.userDetails, ...action.payload}
    },
    setLogout: (state, action) => {
      return  initialState
    },
  },
})

export const { setUserDetails, setLogout } = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer
