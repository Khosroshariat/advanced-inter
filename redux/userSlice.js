import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: null,
    subscription: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    setUser: (state, action) => {
        state.email = action.payload.email,
        state.subscription = action.payload.subscription
    },

    signOutUser: (state) => {
        state.email = null
        state.subscription = null
    }
  }
});

export const { setUser, signOutUser } = userSlice.actions

export default userSlice.reducer