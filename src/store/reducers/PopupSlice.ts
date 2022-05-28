import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface popupState {
  loginPopupIsOpened: boolean;
  registerPopupIsOpened: boolean;
  sidebarIsOpened: boolean;
  notificationIsOpened: boolean;
  notificationTitle: string;
  notificationText: string;
}

const initialState: popupState = {
  loginPopupIsOpened: false,
  registerPopupIsOpened: false,
  sidebarIsOpened: false,
  notificationIsOpened: false,
  notificationTitle: '',
  notificationText: ''
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
    },
    openSidebar(state, action: PayloadAction<boolean>) {
      state.sidebarIsOpened = action.payload;
    },
    openNotification(state, action: PayloadAction<{ title: string; text: string }>) {
      state.notificationIsOpened = true;
      state.notificationTitle = action.payload.title;
      state.notificationText = action.payload.text;
    },
    closeNotification(state) {
      state.notificationIsOpened = false;
      state.notificationTitle = '';
      state.notificationText = '';
    }
  },
  extraReducers: {}
});

export const { openLoginPopup, openRegisterPopup, openSidebar, openNotification, closeNotification } =
  popupSlice.actions;

export default popupSlice.reducer;
