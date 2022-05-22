import { createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from '@reduxjs/toolkit';
import { getItem } from '../../api/api';
import { IComment, IError, IStory } from '../../types/types';
import { NEWS_STORIES } from '../../utils/constants';
import { RootState } from '../store';

interface commentsState {
  comments: IComment[];
  commentsStatus: 'loading' | 'resolved' | 'rejected' | null;
  repliesStatus: 'loading' | 'resolved' | 'rejected' | null;
  error: string | null;
}

const initialState: commentsState = {
  comments: [],
  commentsStatus: null,
  repliesStatus: null,
  error: null
};

export const fetchComments = createAsyncThunk<IComment[], number[], {}>(
  'comments/fetchComments',
  async (arrayIds, thunkAPI) => {
    try {
      let result: IComment[] = await Promise.all(
        arrayIds.map(async (id) => {
          const response = await getItem(id);

          if (!response.ok) {
            throw new Error('Server Error!');
          }

          let comment = await response.json();
          return comment;
        })
      );
      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchReplies = createAsyncThunk<IComment[], { id: number }, { state: RootState }>(
  'comments/fetchReplies',
  async ({ id }, thunkAPI) => {
    const { comments } = thunkAPI.getState();
    try {
      let comment = comments.comments.find((el) => el.id === id);
      if (!comment) {
        return [];
      }
      let result = await Promise.all(
        comment.kids.map(async (id) => {
          const response = await getItem(id);

          if (!response.ok) {
            throw new Error('Server Error!');
          }

          let replies = await response.json();
          return replies;
        })
      );
      return result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const commentsSlice = createSlice({
  name: 'story',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.commentsStatus = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.commentsStatus = 'resolved';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.commentsStatus = 'rejected';
      })
      .addCase(fetchReplies.pending, (state, action) => {
        state.commentsStatus = 'loading';
      })
      .addCase(fetchReplies.fulfilled, (state, action) => {
        state.commentsStatus = 'resolved';
        const index = state.comments.findIndex((el) => el.id === action.meta.arg.id);
        state.comments[index].replies = action.payload;
      })
      .addCase(fetchReplies.rejected, (state, action) => {
        state.commentsStatus = 'rejected';
      });
  }
});

export default commentsSlice.reducer;
