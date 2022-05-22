import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { searchByQuery } from '../../store/reducers/StoriesSlice';
import styles from './Naviagtion.module.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router';

const Naviagation: FC = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className={styles.navigation}>
      <ul className={styles.navigation__list}>
        <li className={styles.navigation__item}>
          <Link
            to={'/'}
            className={
              path === '/' ? `${styles.navigation__link} ${styles.navigation__link_active}` : styles.navigation__link
            }>
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
            }>
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
            }>
            <span className={`${styles['navigation__icon']} ${styles['navigation__icon-best']}`}></span>
            <p className={styles.navigation__text}>Best news</p>
          </Link>
        </li>
        <li>
          <Link
            to={'/jobs'}
            className={
              path === '/jobs'
                ? `${styles.navigation__link} ${styles.navigation__link_active}`
                : styles.navigation__link
            }>
            <span className={`${styles['navigation__icon']} ${styles['navigation__icon-jobs']}`}></span>
            <p className={styles.navigation__text}>Jobs</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Naviagation;
