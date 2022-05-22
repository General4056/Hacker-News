import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItem, getStoriesIds } from '../../api/api';
import { IStory } from '../../types/types';
import { NEWS_STORIES, TOP_STORIES } from '../../utils/constants';
import { RootState } from '../store';

interface topNewsState {
  storiesIds: number[];
  stories: IStory[];
  storiesIdsStatus: 'loading' | 'resolved' | 'rejected' | null;
  storiesStatus: 'loading' | 'resolved' | 'rejected' | null;
  error: string | null;
}

const initialState: topNewsState = {
  storiesIds: [],
  stories: [],
  storiesIdsStatus: null,
  storiesStatus: null,
  error: null
};

export const fetchStoriesIds = createAsyncThunk(
  'stories/fetchStoriesIds',
  async function (storyType: string, thunkAPI) {
    try {
      const response = await getStoriesIds(storyType);

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      let idArr = await response.json();
      return idArr;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchStories: any = createAsyncThunk<any[], any, { state: RootState }>(
  'stories/fetchStories',
  async (_, thunkAPI) => {
    const { stories } = thunkAPI.getState();
    try {
      const result = await Promise.all(
        stories.storiesIds.slice(0, 100).map(async (id) => {
          const response = await getItem(id);

          if (!response.ok) {
            throw new Error('Server Error!');
          }

          let story = await response.json();
          return story;
        })
      );
      return result;
    } catch (error: any) {
      throw Error(error.message);
    }
  }
);

export const fetchStoriesByQuery: any = createAsyncThunk<any[], any, { state: RootState }>(
  'stories/fetchStories',
  async (query: string, thunkAPI) => {
    const { stories } = thunkAPI.getState();
    try {
      let result = await Promise.all(
        stories.storiesIds.slice(0, 100).map(async (id) => {
          const response = await getItem(id);

          if (!response.ok) {
            throw new Error('Server Error!');
          }

          let story = await response.json();
          return story;
        })
      );

      result = result.filter((item) => {
        return item.title.toLowerCase().includes(query);
      });

      return result;
    } catch (error: any) {
      throw Error(error.message);
    }
  }
);

export const StoriesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    searchByQuery(state, action: PayloadAction<string>) {
      state.stories = state.stories.filter((item) => {
        return item.title.toLowerCase().includes(action.payload);
      });
    }
  },
  extraReducers: {
    [fetchStoriesIds.pending.type]: (state) => {
      state.storiesIdsStatus = 'loading';
      state.error = null;
    },
    [fetchStoriesIds.fulfilled.type]: (state, action: PayloadAction<[]>) => {
      state.storiesIdsStatus = 'resolved';
      state.storiesIds = action.payload;
    },
    [fetchStoriesIds.rejected.type]: (state, action: PayloadAction<string>) => {
      state.storiesIdsStatus = 'rejected';
      state.error = action.payload;
    },
    [fetchStories.pending.type]: (state) => {
      state.storiesStatus = 'loading';
      state.error = null;
    },
    [fetchStories.fulfilled.type]: (state, action: PayloadAction<[]>) => {
      state.storiesStatus = 'resolved';
      state.stories = action.payload;
    },
    [fetchStories.rejected.type]: (state, action: PayloadAction<string>) => {
      state.storiesStatus = 'rejected';
      state.error = action.payload;
    },
    [fetchStoriesByQuery.pending.type]: (state) => {
      state.storiesStatus = 'loading';
      state.error = null;
    },
    [fetchStoriesByQuery.fulfilled.type]: (state, action: PayloadAction<[]>) => {
      state.storiesStatus = 'resolved';
      state.stories = action.payload;
    },
    [fetchStoriesByQuery.rejected.type]: (state, action: PayloadAction<string>) => {
      state.storiesStatus = 'rejected';
      state.error = action.payload;
    }
  }
});

export const { searchByQuery } = StoriesSlice.actions;

export default StoriesSlice.reducer;
