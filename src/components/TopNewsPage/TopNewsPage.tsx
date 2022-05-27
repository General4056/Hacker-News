import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { TOP_STORIES } from '../../utils/constants';
import Header from '../Header/Header';
import StoryList from '../StoryList/StoryList';
import styles from '../LatestNewsPage/LatestNewsPage.module.css';
import { fetchStories, fetchStoriesIds } from '../../store/reducers/StoriesSlice';
import Naviagation from '../SideMenu/SideMenu';

const TopNewsPage: FC = () => {
  const dispatch = useAppDispatch();
  const [isFetching, setIsFetching] = useState(false);

  const { stories, storiesIdsStatus } = useAppSelector((store) => store.stories);

  useEffect(() => {
    setIsFetching(true);
    dispatch(fetchStoriesIds(TOP_STORIES));
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

export default TopNewsPage;
