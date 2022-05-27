import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { openLoginPopup, openRegisterPopup, openSidebar } from '../../store/reducers/PopupSlice';
import { searchByQuery } from '../../store/reducers/StoriesSlice';
import Authorization from '../Authorization/Authorization';
import styles from './Header.module.css';

interface HeaderProps {
  handleExit: () => void;
}

const Header: FC<HeaderProps> = ({ handleExit }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const dispatch = useAppDispatch();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  function searchSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    dispatch(searchByQuery(searchQuery));
    setSearchQuery('');
  }

  function handleMenuClick() {
    dispatch(openSidebar(true));
  }

  return (
    <div className={styles.header}>
      <button className={styles['burger-button']} onClick={handleMenuClick}></button>
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
      <Authorization handleExit={handleExit} />
    </div>
  );
};

export default Header;
