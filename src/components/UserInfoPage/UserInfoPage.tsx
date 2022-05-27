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
import styles from './UserInfoPage.module.css';

const UserInfoPage: FC = () => {
  const { user, userStatus } = useAppSelector((store) => store.user);

  const created: string = formatDate(new Date(user.created * 1000));

  interface StoryPageParams {
    id?: string;
  }

  const params: StoryPageParams = useParams();
  const dispatch = useAppDispatch();
  const id = params.id;

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, []);

  return (
    <>
      <Naviagation />
      <div className={styles.info}>
        {userStatus === 'loading' ? (
          <div>LOADING</div>
        ) : (
          <>
            <div className={styles.info__avatar}></div>
            <p className={styles.info__item}>
              nickname: <span className={styles.info__nickname}>{user.id}</span>
            </p>
            <p className={styles.info__item}>
              created at: <span className={styles.info__created}>{created}</span>
            </p>
            <p className={styles.info__item}>
              karma: <span className={styles.info__karma}>{user.karma}</span>
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default UserInfoPage;
