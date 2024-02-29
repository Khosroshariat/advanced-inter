import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loginModalOpen: false,
    singupModalOpen: false

}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openLoginModal: (state) => {
        state.loginModalOpen = true
    },
    closeLoginModal: (state) => {
        state.loginModalOpen = false
    },
    openSignupModal: (state) => {
      state.singupModalOpen = true
  },
  closeSignupModal: (state) => {
    state.singupModalOpen = false
}
  }
});

export const {openLoginModal, closeLoginModal, openSignupModal, closeSignupModal} = modalSlice.actions

export default modalSlice.reducer