import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { openLoginPopup, openRegisterPopup } from '../../store/reducers/PopupSlice';
import { searchByQuery } from '../../store/reducers/StoriesSlice';
import styles from './Header.module.css';

interface HeaderProps {
  handleExit: () => void;
}

const Header: FC<HeaderProps> = ({ handleExit }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [popoverIsOpened, setPopoverIsOpened] = useState<boolean>(false);

  const { loggedIn, user } = useAppSelector((store) => store.loginUser);

  const dispatch = useAppDispatch();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  function searchSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    dispatch(searchByQuery(searchQuery));
    setSearchQuery('');
  }

  function handlePopoverClick() {
    setPopoverIsOpened(!popoverIsOpened);
  }

  function openLogin() {
    dispatch(openLoginPopup(true));
  }

  function openRegister() {
    dispatch(openRegisterPopup(true));
  }

  function handleExitClick() {
    handleExit();
    handlePopoverClick();
  }

  return (
    <div className={styles.header}>
      <Link to={'/'} className={styles.header__title}>
        <span className={styles.header__logo}></span>
        HACKER NEWS
      </Link>

      <div className={styles.search}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className={styles.search__input}
          placeholder="Поиск на странице"
        />
        <button onClick={searchSubmit} className={styles.search__button} disabled={!searchQuery}></button>
      </div>
      {loggedIn ? (
        <>
          <div className={styles.header__container}>
            <>
              <button className={styles.header__button} onClick={handlePopoverClick}>
                <div className={styles.header__account}></div>
                <div className={styles.header__arrow}></div>
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
        <div className={styles.header__navigation}>
          <button className={styles.header__login} onClick={openLogin}>
            Log In
          </button>
          <button className={styles.header__signup} onClick={openRegister}>
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
