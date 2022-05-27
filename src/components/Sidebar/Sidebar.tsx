import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { openLoginPopup, openRegisterPopup, openSidebar } from '../../store/reducers/PopupSlice';
import Navigation from '../Navigation/Navigation';
import styles from './Sidebar.module.css';

const Sidebar: FC = () => {
  const dispatch = useAppDispatch();

  const { loggedIn } = useAppSelector((store) => store.loginUser);
  const { sidebarIsOpened } = useAppSelector((store) => store.popup);

  function handleClose() {
    dispatch(openSidebar(false));
  }
  function openLogin() {
    handleClose();
    dispatch(openLoginPopup(true));
  }

  return (
    <div className={sidebarIsOpened ? `${styles.sidebar} ${styles.sidebar_active}` : styles.sidebar}>
      <div className={styles.sidebar__container}>
        <button className={styles.sidebar__close} onClick={handleClose}></button>
        <Link to={'/'} className={styles.sidebar__title}>
          <span className={styles.sidebar__logo}></span>
          HACKER NEWS
        </Link>
        <Navigation />
        {!loggedIn && (
          <button className={styles.navigation__account} onClick={openLogin}>
            <span className={styles.navigation__text}>Account</span>
            <div className={styles.navigation__image}></div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
