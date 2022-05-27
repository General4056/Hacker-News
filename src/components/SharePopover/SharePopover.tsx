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
import styles from './SharePopover.module.css';

interface SharePopoverProps {
  isOpened: boolean;
}

const SharePopover: FC<SharePopoverProps> = ({ isOpened }) => {
  return (
    <div className={isOpened ? `${styles.share} ${styles.share__active}` : styles.share}>
      <ul className={styles.share__list}>
        <li className={styles.share__link}>
          <div className={`${styles['share__icon']} ${styles['share__icon_link']}`}></div>
          <span className={styles.share__text}>Копировать ссылку</span>
        </li>
        <li className={styles.share__link}>
          <div className={`${styles['share__icon']} ${styles['share__icon_vk']}`}></div>
          <span className={styles.share__text}>ВКонтакте</span>
        </li>
        <li className={styles.share__link}>
          <div className={`${styles['share__icon']} ${styles['share__icon_twitter']}`}></div>
          <span className={styles.share__text}>Twitter</span>
        </li>
        <li className={styles.share__link}>
          <div className={`${styles['share__icon']} ${styles['share__icon_telegram']}`}></div>
          <span className={styles.share__text}>Telegram</span>
        </li>
        <li className={styles.share__link}>
          <div className={`${styles['share__icon']} ${styles['share__icon_post']}`}></div>
          <span className={styles.share__text}>Отправить на почту</span>
        </li>
        <li className={styles.share__link}>
          <div className={`${styles['share__icon']} ${styles['share__icon_odnoklas']}`}></div>
          <span className={styles.share__text}>Одноклассники</span>
        </li>
      </ul>
    </div>
  );
};

export default SharePopover;
