import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItem } from '../../api/api';
import { IComment, IStory } from '../../types/types';
import { NEWS_STORIES } from '../../utils/constants';
import { RootState } from '../store';

interface storyState {
  story: IStory;
  comments: IComment[];
  commentsStatus: 'loading' | 'resolved' | 'rejected' | null;
  storyStatus: 'loading' | 'resolved' | 'rejected' | null;
  error: string | null;
}

const initialState: storyState = {
  story: {
    by: '',
    descendants: 0,
    id: 0,
    kids: [],
    score: 0,
    time: 0,
    title: '',
    type: '',
    url: ''
  },
  comments: [],
  commentsStatus: null,
  storyStatus: null,
  error: null
};

export const fetchStory = createAsyncThunk('story/fetchStory', async (id: number, thunkAPI) => {
  try {
    const response = await getItem(id);
    if (!response.ok) {
      throw new Error('Server Error!');
    }

    let story = await response.json();
    return story;
  } catch (error: any) {
    throw Error(error.message);
  }
});

// export const fetchComments = createAsyncThunk<any, number, { state: RootState }>(
//   'story/fetchComments',
//   async (id, thunkAPI) => {
//     const { story } = thunkAPI.getState();
//     try {
//       const result = await Promise.all(
//         story.story.kids.map(async (id) => {
//           const response = await getItem(id);
//           if (!response.ok) {
//             throw new Error('Server Error!');
//           }
//           let comment = await response.json();
//           if(comment.kids) {

//           }
//           return comment;
//         })
//       );
//     } catch {}

// try {
// const result = await Promise.all(
//   array.map(async (id) => {
//     const response = await getItem(id);
//     if (!response.ok) {
//       throw new Error('Server Error!');
//     }
//     let comment = await response.json();
//     return comment;
//   })
// );
// return result;
// } catch (error: any) {
//   throw Error(error.message);
// }
//   }
// );

// export const fetchStoriesByQuery: any = createAsyncThunk<any[], any, { state: RootState }>(
//   'stories/fetchStories',
//   async (query: string, thunkAPI) => {
//     const { stories } = thunkAPI.getState();
//     try {
//       let result = await Promise.all(
//         stories.storiesIds.slice(0, 100).map(async (id) => {
//           const response = await getItem(id);

//           if (!response.ok) {
//             throw new Error('Server Error!');
//           }

//           let story = await response.json();
//           return story;
//         })
//       );

//       result = result.filter((item) => {
//         return item.title.toLowerCase().includes(query);
//       });

//       return result;
//     } catch (error: any) {
//       throw Error(error.message);
//     }
//   }
// );

export const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchStory.pending.type]: (state) => {
      state.storyStatus = 'loading';
      state.error = null;
    },
    [fetchStory.fulfilled.type]: (state, action: PayloadAction<IStory>) => {
      state.storyStatus = 'resolved';
      state.story = action.payload;
    },
    [fetchStory.rejected.type]: (state, action: PayloadAction<string>) => {
      state.storyStatus = 'rejected';
      state.error = action.payload;
    }
    // [fetchComments.pending.type]: (state) => {
    //   state.commentsStatus = 'loading';
    //   state.error = null;
    // },
    // [fetchComments.fulfilled.type]: (state, action: PayloadAction<IComment[]>) => {
    //   state.commentsStatus = 'resolved';
    //   state.comments = action.payload;
    // },
    // [fetchComments.rejected.type]: (state, action: PayloadAction<string>) => {
    //   state.commentsStatus = 'rejected';
    //   state.error = action.payload;
    // }
  }
});

export default storySlice.reducer;
