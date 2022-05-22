import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoginUser } from '../../types/types';

interface loginState {
  user: ILoginUser;
  loggedIn: boolean;
}

const initialState: loginState = {
  user: {
    name: '',
    email: '',
    created: null,
    karma: null,
    about: 'string'
  },
  loggedIn: false
};

interface ISetUserPayload {
  name: string;
  email: string;
}

export const loginUserSlice = createSlice({
  name: 'loginUser',
  initialState,
  reducers: {
    createUser(state, action: PayloadAction<ISetUserPayload>) {
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        created: Date.now(),
        karma: 0,
        about: 'description of user'
      };
    },
    loginUser(state, action: PayloadAction<boolean>) {
      state.loggedIn = action.payload;
    },
    clearUser(state) {
      state.user = {
        name: '',
        email: '',
        created: null,
        karma: null,
        about: ''
      };
    }
  },
  extraReducers: {}
});

export const { createUser, loginUser, clearUser } = loginUserSlice.actions;

export default loginUserSlice.reducer;
