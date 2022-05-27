import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getItem, getUser } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchStory } from '../../store/reducers/StorySlice';
import { fetchUser } from '../../store/reducers/UserSlice';
import { IStory } from '../../types/types';
import { formatDate } from '../../utils/helpers';
import Comments from '../Comments/Comments';
import Header from '../Header/Header';
import Naviagation from '../SideMenu/SideMenu';
import StoryItem from '../StoryItem/StoryItem';
import StoryList from '../StoryList/StoryList';
import styles from './SavedStorisPage.module.css';

const SavedStoriesPage: FC = () => {
  const { savedStories } = useAppSelector((store) => store.savedStories);

  return (
    <>
      <Naviagation />
      <div className={styles.saved}>
        <StoryList stories={savedStories} isLoading={false} withComments={true} isSavedStories={true} />
      </div>
    </>
  );
};

export default SavedStoriesPage;
