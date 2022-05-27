import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { searchByQuery } from '../../store/reducers/StoriesSlice';
import styles from './SideMenu.module.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import Navigation from '../Navigation/Navigation';

const SideMenu: FC = () => {
  return (
    <div className={styles['side-menu']}>
      <Navigation />
    </div>
  );
};

export default SideMenu;
