import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItem, getUser } from '../../api/api';
import { IComment, IStory, IUser } from '../../types/types';
import { NEWS_STORIES } from '../../utils/constants';
import { RootState } from '../store';

interface userState {
  user: IUser;
  userStatus: 'loading' | 'resolved' | 'rejected' | null;
  error: string | null;
}

const initialState: userState = {
  user: {
    id: '',
    created: 0,
    submitted: [],
    karma: 0,
    about: 'string'
  },
  userStatus: null,
  error: null
};

export const fetchUser = createAsyncThunk('user/fetchUser', async (id: string, thunkAPI) => {
  try {
    const response = await getUser(id);
    if (!response.ok) {
      throw new Error('Server Error!');
    }

    let user = await response.json();
    return user;
  } catch (error: any) {
    throw Error(error.message);
  }
});

export const userSlice = createSlice({
  name: 'story',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.pending.type]: (state) => {
      state.userStatus = 'loading';
      state.error = null;
    },
    [fetchUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.userStatus = 'resolved';
      state.user = action.payload;
    },
    [fetchUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.userStatus = 'rejected';
      state.error = action.payload;
    }
  }
});

export default userSlice.reducer;
