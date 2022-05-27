import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getItem } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchStory } from '../../store/reducers/StorySlice';
import { IStory } from '../../types/types';
import Comments from '../Comments/Comments';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import Naviagation from '../SideMenu/SideMenu';
import StoryItem from '../StoryItem/StoryItem';
import styles from './StoryPage.module.css';

const StoryPage: FC = () => {
  const { story, storyStatus } = useAppSelector((store) => store.story);

  const makeDate = () => {
    const date = new Date(story.time * 1000);
    const day = `0${date.getDate()}`;
    const month = `0${date.getMonth() + 1}`;
    const year = date.getFullYear();
    const hours = `0${date.getHours()}`;
    const minutes = `0${date.getMinutes()}`;
    const seconds = `0${date.getSeconds()}`;
    return `${day.substr(-2)}/${month.substr(-2)}/${year} ${hours.substr(-2)}:${minutes.substr(-2)}:${seconds.substr(
      -2
    )}`;
  };

  interface StoryPageParams {
    id?: string;
  }

  const params: StoryPageParams = useParams();
  const dispatch = useAppDispatch();

  const id = Number(params.id);

  useEffect(() => {
    dispatch(fetchStory(id));
  }, []);

  return (
    <>
      <Naviagation />
      <div className={styles.stories}>
        {storyStatus === 'loading' ? (
          <div className={styles.loader}>
            <Loader />
          </div>
        ) : (
          <div className={styles.stories__list}>
            <div className={styles.stories__header}>
              <div className={styles.stories__container}>
                <p className={styles.stories__time}>
                  Posted by{' '}
                  <Link to={`/user/${story.by}`} className={styles['stories__text-bold']}>
                    {story.by}{' '}
                  </Link>
                  <span>{makeDate()}</span>
                </p>
                <a href={story.url} className={styles.stories__link} target="_blank" rel="noreferrer">
                  Link to source
                </a>
              </div>
              <h2 className={styles.stories__title}>{story.title}</h2>
            </div>
            <div className={styles.stories__comments}>
              <h3 className={styles.stories__subtitle}>Comments ({story.descendants})</h3>
              {story.kids ? <Comments commentIds={story.kids} /> : <div>no comments</div>}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StoryPage;
