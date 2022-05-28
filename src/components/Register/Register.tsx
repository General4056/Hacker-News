import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useInput } from '../../hooks/useInput';
import { openLoginPopup, openNotification, openRegisterPopup } from '../../store/reducers/PopupSlice';

import styles from './../Login/Login.module.css';

interface RegisterProps {
  loginUser: (name: string, email: string) => void;
}

const Register: FC<RegisterProps> = ({ loginUser }) => {
  const dispatch = useAppDispatch();

  const { registerPopupIsOpened } = useAppSelector((store) => store.popup);

  const nameInput = useInput('', {
    isEmpty: true,
    minLength: 4,
    maxLength: 30
  });

  const emailInput = useInput('', {
    isEmail: true,
    isEmpty: true,
    minLength: 3,
    maxLength: 30
  });

  const passwordInput = useInput('', {
    isEmpty: true,
    minLength: 5,
    maxLength: 16
  });

  function closePopup() {
    dispatch(openRegisterPopup(false));
  }

  function handleClose() {
    nameInput.clear();
    emailInput.clear();
    passwordInput.clear();
    closePopup();
  }

  function handleRegister(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    loginUser(nameInput.value, emailInput.value);
    handleClose();
    dispatch(openNotification({ title: 'Success!', text: 'your registration was successfully completed' }));
  }

  function handleLoginPopup() {
    handleClose();
    dispatch(openLoginPopup(true));
  }

  return (
    <div className={registerPopupIsOpened ? styles.overlay : `${styles.overlay} ${styles.overlay_hidden}`}>
      <div className={styles.login}>
        <div className={styles.login__image}>
          <div className={styles.login__text}>
            <span className={styles.login__logo}></span>
            HACKER NEWS
          </div>
        </div>
        <div className={styles.login__container}>
          <form className={styles.login__form}>
            <h2 className={styles.login__title}>Регистрация</h2>
            <label className={styles.login__label}>
              <input
                className={
                  nameInput.isDirty && !nameInput.inputValid
                    ? `${styles.login__input} ${styles.login__input_error}`
                    : styles.login__input
                }
                type="name"
                value={nameInput.value}
                onChange={nameInput.onChange}
                onBlur={nameInput.onBlur}
                placeholder="Имя"
              />
              {nameInput.isDirty && !nameInput.inputValid && (
                <span className={styles.login__error}>{nameInput.errorMessage}</span>
              )}
            </label>
            <label className={styles.login__label}>
              <input
                className={
                  emailInput.isDirty && !emailInput.inputValid
                    ? `${styles.login__input} ${styles.login__input_error}`
                    : styles.login__input
                }
                type="email"
                value={emailInput.value}
                onChange={emailInput.onChange}
                onBlur={emailInput.onBlur}
                placeholder="Почта"
              />
              {emailInput.isDirty && !emailInput.inputValid && (
                <span className={styles.login__error}>{emailInput.errorMessage}</span>
              )}
            </label>
            <label className={styles.login__label}>
              <input
                className={
                  passwordInput.isDirty && !passwordInput.inputValid
                    ? `${styles.login__input} ${styles.login__input_error}`
                    : styles.login__input
                }
                type="password"
                value={passwordInput.value}
                onChange={passwordInput.onChange}
                onBlur={passwordInput.onBlur}
                placeholder="Пароль"
              />
              {passwordInput.isDirty && !passwordInput.inputValid && (
                <span className={styles.login__error}>{passwordInput.errorMessage}</span>
              )}
            </label>
            <button
              className={styles.login__submit}
              disabled={!nameInput.inputValid || !passwordInput.inputValid || !emailInput.inputValid}
              onClick={handleRegister}>
              Войти
            </button>
          </form>
          <p className={styles.login__auth}>
            Есть аккаунт?
            <button onClick={handleLoginPopup} className={styles.login__link}>
              Войти
            </button>
          </p>

          <button className={styles.login__close} onClick={handleClose}></button>
        </div>
      </div>
    </div>
  );
};

export default Register;
