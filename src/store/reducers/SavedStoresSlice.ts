import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStory } from '../../types/types';

interface topNewsState {
  savedStories: IStory[];
}

interface IDeleteStoryPayload {
  id: number;
}

const initialState: topNewsState = {
  savedStories: []
};

export const savedStoriesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    saveStory(state, action: PayloadAction<IStory>) {
      state.savedStories.push(action.payload);
    },
    deleteStory(state, action: PayloadAction<IDeleteStoryPayload>) {
      state.savedStories = state.savedStories.filter((element) => {
        return element.id !== action.payload.id;
      });
    },
    clearSavedStories(state) {
      state.savedStories = [];
    }
  },
  extraReducers: {}
});

export const { saveStory, deleteStory, clearSavedStories } = savedStoriesSlice.actions;

export default savedStoriesSlice.reducer;
