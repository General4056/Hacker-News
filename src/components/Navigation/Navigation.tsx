import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import { useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { openSidebar } from '../../store/reducers/PopupSlice';

const Navigation: FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useAppDispatch();

  function handleLink() {
    dispatch(openSidebar(false));
  }

  return (
    <ul className={styles.navigation}>
      <li className={styles.navigation__item}>
        <Link
          to={'/'}
          className={
            path === '/' ? `${styles.navigation__link} ${styles.navigation__link_active}` : styles.navigation__link
          }
          onClick={handleLink}>
          <span className={`${styles['navigation__icon']} ${styles['navigation__icon-latest']}`}></span>
          <p className={styles.navigation__text}>Latest news</p>
        </Link>
      </li>
      <li>
        <Link
          to={'/top-news'}
          className={
            path === '/top-news'
              ? `${styles.navigation__link} ${styles.navigation__link_active}`
              : styles.navigation__link
          }
          onClick={handleLink}>
          <span className={`${styles['navigation__icon']} ${styles['navigation__icon-top']}`}></span>
          <p className={styles.navigation__text}>Top news</p>
        </Link>
      </li>
      <li>
        <Link
          to={'/best-news'}
          className={
            path === '/best-news'
              ? `${styles.navigation__link} ${styles.navigation__link_active}`
              : styles.navigation__link
          }
          onClick={handleLink}>
          <span className={`${styles['navigation__icon']} ${styles['navigation__icon-best']}`}></span>
          <p className={styles.navigation__text}>Best news</p>
        </Link>
      </li>
      <li>
        <Link
          to={'/jobs'}
          className={
            path === '/jobs' ? `${styles.navigation__link} ${styles.navigation__link_active}` : styles.navigation__link
          }
          onClick={handleLink}>
          <span className={`${styles['navigation__icon']} ${styles['navigation__icon-jobs']}`}></span>
          <p className={styles.navigation__text}>Jobs</p>
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;
