import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { openLoginPopup, openRegisterPopup } from '../../store/reducers/PopupSlice';
import { searchByQuery } from '../../store/reducers/StoriesSlice';
import styles from './Loader.module.css';

const Loader: FC = () => {
  return (
    <div className={`${styles['lds-roller']}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
