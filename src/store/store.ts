import { configureStore } from '@reduxjs/toolkit';
import StoriesReducer from './reducers/StoriesSlice';
import StoryReducer from './reducers/StorySlice';
import UserReducer from './reducers/UserSlice';
import LoginUserReducer from './reducers/LoginUserSlice';
import PopupReducer from './reducers/PopupSlice';
import SavedStoriesReducer from './reducers/SavedStoresSlice';
import CommentsReducer from './reducers/CommentsSlice';

export const store = configureStore({
  reducer: {
    story: StoryReducer,
    stories: StoriesReducer,
    user: UserReducer,
    loginUser: LoginUserReducer,
    popup: PopupReducer,
    savedStories: SavedStoriesReducer,
    comments: CommentsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
