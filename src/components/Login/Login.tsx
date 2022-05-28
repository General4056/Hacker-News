import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useInput } from '../../hooks/useInput';
import { openLoginPopup, openNotification, openRegisterPopup } from '../../store/reducers/PopupSlice';

import styles from './Login.module.css';

interface LoginProps {
  loginUser: (name: string, email: string) => void;
}

const Login: FC<LoginProps> = ({ loginUser }) => {
  const dispatch = useAppDispatch();

  const { loginPopupIsOpened } = useAppSelector((store) => store.popup);

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
    dispatch(openLoginPopup(false));
  }

  function handleClose() {
    emailInput.clear();
    passwordInput.clear();
    closePopup();
  }

  function handleRegisterPopup() {
    handleClose();
    dispatch(openRegisterPopup(true));
  }

  function handleLogin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    loginUser('defaultUser', emailInput.value);
    handleClose();
    dispatch(openNotification({ title: 'Success!', text: 'you have successfully logged in' }));
  }

  return (
    <div className={loginPopupIsOpened ? styles.overlay : `${styles.overlay} ${styles.overlay_hidden}`}>
      <div className={styles.login}>
        <div className={styles.login__image}>
          <div className={styles.login__text}>
            <span className={styles.login__logo}></span>
            HACKER NEWS
          </div>
        </div>
        <div className={styles.login__container}>
          <form className={styles.login__form}>
            <h2 className={styles.login__title}>Вход в аккаунт</h2>
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
              disabled={!passwordInput.inputValid || !emailInput.inputValid}
              onClick={handleLogin}>
              Войти
            </button>
          </form>
          <p className={styles.login__auth}>
            Нет аккаунта?
            <button className={styles.login__link} onClick={handleRegisterPopup}>
              Регистрация
            </button>
          </p>

          <button className={styles.login__close} onClick={handleClose}></button>
        </div>
      </div>
    </div>
  );
};

export default Login;
