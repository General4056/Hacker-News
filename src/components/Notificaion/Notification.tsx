import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { closeNotification, openNotification } from '../../store/reducers/PopupSlice';
import style from './Notification.module.css';

// interface NotificationProps {
//   title: string;
//   text: string;
// }

const Notification: FC = () => {
  const { notificationIsOpened, notificationTitle, notificationText } = useAppSelector((store) => store.popup);
  const dispatch = useAppDispatch();

  function close() {
    dispatch(closeNotification());
  }

  useEffect(() => {
    setTimeout(close, 5000);
  }, [notificationIsOpened]);

  return (
    <div className={notificationIsOpened ? `${style.success} ${style.success_active}` : style.success}>
      <div className={style.success__image}></div>
      <div className={style.success__container}>
        <h2 className={style.success__title}>{notificationTitle}</h2>
        <p className={style.success__text}>{notificationText}</p>
      </div>
      <button className={style.success__close} type="button" title="Close" onClick={close}></button>
    </div>
  );
};

export default Notification;
