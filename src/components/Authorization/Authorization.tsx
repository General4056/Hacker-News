import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { openLoginPopup, openRegisterPopup } from '../../store/reducers/PopupSlice';
import { searchByQuery } from '../../store/reducers/StoriesSlice';
import styles from './Authorization.module.css';

interface HeaderProps {
  handleExit: () => void;
}

const Authorization: FC<HeaderProps> = ({ handleExit }) => {
  const [popoverIsOpened, setPopoverIsOpened] = useState<boolean>(false);

  const { loggedIn, user } = useAppSelector((store) => store.loginUser);

  const dispatch = useAppDispatch();

  function handlePopoverClick() {
    setPopoverIsOpened(!popoverIsOpened);
  }

  function handleExitClick() {
    handleExit();
    handlePopoverClick();
  }

  function openLogin() {
    dispatch(openLoginPopup(true));
  }

  function openRegister() {
    dispatch(openRegisterPopup(true));
  }

  return (
    <>
      {loggedIn ? (
        <>
          <div className={styles.profile}>
            <>
              <button className={styles.profile__button} onClick={handlePopoverClick}>
                <div className={styles.profile__account}></div>
                <div className={styles.profile__arrow}></div>
              </button>
            </>
            <div className={popoverIsOpened ? `${styles.popover} ${styles.popover_active}` : styles.popover}>
              <p className={styles.popover__title}>Профиль</p>
              <ul className={styles.popover__list}>
                <li className={styles.popover__item}>
                  <div className={`${styles['popover__image']} ${styles['popover__image_account']}`}></div>
                  <span className={styles.popover__text}>{user.name}</span>
                </li>
                <li className={styles.popover__item}>
                  <Link to={'/saved-stories'} className={styles.popover__link} onClick={handlePopoverClick}>
                    <div className={`${styles['popover__image']} ${styles['popover__image_save']}`}></div>
                    <span className={styles.popover__text}>Закладки</span>
                  </Link>
                </li>
                <li className={styles.popover__item}>
                  <div className={`${styles['popover__image']} ${styles['popover__image_settings']}`}></div>
                  <span className={styles.popover__text}>Настройки</span>
                </li>
                <li className={styles.popover__item} onClick={handleExitClick}>
                  <div className={`${styles['popover__image']} ${styles['popover__image_exit']}`}></div>
                  <span className={`${styles.popover__text} ${styles.popover__text_red}`}>Выход</span>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.navigation}>
          <button className={styles.login} onClick={openLogin}>
            Log In
          </button>
          <button className={styles.signup} onClick={openRegister}>
            Sign Up
          </button>
        </div>
      )}
    </>
  );
};

export default Authorization;
