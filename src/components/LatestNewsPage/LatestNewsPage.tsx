import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchStories, fetchStoriesIds } from '../../store/reducers/StoriesSlice';
import { NEWS_STORIES } from '../../utils/constants';
import Header from '../Header/Header';
import Naviagation from '../SideMenu/SideMenu';
import StoryList from '../StoryList/StoryList';
import styles from './LatestNewsPage.module.css';

const LatestNewsPage: FC = () => {
  const dispatch = useAppDispatch();
  const [isFetching, setIsFetching] = useState(false);

  const { stories, storiesIdsStatus } = useAppSelector((store) => store.stories);

  useEffect(() => {
    setIsFetching(true);
    dispatch(fetchStoriesIds(NEWS_STORIES));
  }, []);

  useEffect(() => {
    if (storiesIdsStatus === 'resolved' && isFetching) {
      dispatch(fetchStories()).finally(() => {
        setIsFetching(false);
      });
    }
  }, [isFetching, storiesIdsStatus]);

  return (
    <>
      <div className={styles.container}>
        <Naviagation />
        <div className={styles.news}>
          <StoryList stories={stories} isLoading={isFetching} withComments={true} />
        </div>
      </div>
    </>
  );
};

export default LatestNewsPage;
