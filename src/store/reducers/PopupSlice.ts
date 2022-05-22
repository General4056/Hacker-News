import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface popupState {
  loginPopupIsOpened: boolean;
  registerPopupIsOpened: boolean;
}

const initialState: popupState = {
  loginPopupIsOpened: false,
  registerPopupIsOpened: false
};

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openLoginPopup(state, action: PayloadAction<boolean>) {
      state.loginPopupIsOpened = action.payload;
    },
    openRegisterPopup(state, action: PayloadAction<boolean>) {
      state.registerPopupIsOpened = action.payload;
    }
  },
  extraReducers: {}
});

export const { openLoginPopup, openRegisterPopup } = popupSlice.actions;

export default popupSlice.reducer;