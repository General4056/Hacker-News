import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { openRegisterPopup } from '../../store/reducers/PopupSlice';
import { deleteStory, saveStory } from '../../store/reducers/SavedStoresSlice';
import { IStory } from '../../types/types';
import SharePopover from '../SharePopover/SharePopover';
import styles from './StoryItem.module.css';

interface StoryItemProps {
  openedId: number | null;
  story: IStory;
  withComments: boolean;
  handleIdChange: (id: number) => void;
}

const StoryItem: FC<StoryItemProps> = ({ story, withComments, handleIdChange, openedId }) => {
  const [isSharePopoverOpened, setIsSharePopoverOpened] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (openedId !== story.id) {
      setIsSharePopoverOpened(false);
    }
  }, [openedId, story]);

  const { loggedIn } = useAppSelector((store) => store.loginUser);

  const { savedStories } = useAppSelector((store) => store.savedStories);

  let date = new Date(story.time * 1000);
  let hoursAgo = Math.floor((Date.now() - date.getTime()) / 3600000);

  const saved = savedStories.some((el) => {
    return el.id === story.id;
  });

  function openRegister() {
    dispatch(openRegisterPopup(true));
  }

  function handleSaveStory() {
    saved ? dispatch(deleteStory({ id: story.id })) : dispatch(saveStory(story));
  }

  function handleSaveButton() {
    loggedIn ? handleSaveStory() : openRegister();
  }

  function handleShareButton() {
    handleIdChange(story.id);
    setIsSharePopoverOpened(!isSharePopoverOpened);
  }

  return (
    <div className={styles.item}>
      <p className={styles.item__text}>
        Posted by{' '}
        <Link to={`/user/${story.by}`} className={styles['item__text-bold']}>
          {story.by}{' '}
        </Link>
        {hoursAgo < 1 ? <span>less then hour ago</span> : <span>{hoursAgo} hours ago</span>}
      </p>
      <h2 className={styles.item__title}>{story.title}</h2>
      <a href={story.url} className={styles.item__url} target="_blank" rel="noreferrer">
        Link to source
      </a>
      <div className={styles.item__wrapper}>
        <div className={styles['item__button-container']}>
          {withComments && (
            <Link to={`/${story.id}`} className={styles.item__comment}>
              <div className={styles['item_commets-img']}></div>
              <p className={styles.item__commenttext}>{story.descendants} comments</p>
            </Link>
          )}
          <button
            className={saved ? `${styles.item__save} ${styles.item__save_active}` : styles.item__save}
            onClick={handleSaveButton}></button>
          <div className={styles[`item__share-container`]}>
            <button className={styles.item__share} onClick={handleShareButton}></button>
            <SharePopover isOpened={isSharePopoverOpened} />
          </div>
        </div>
        <div className={styles['item__rating-container']}>
          <button className={`${styles['item__rating-button']} ${styles['item__rating-button_down']}`}></button>
          <p className={styles.item__score}>{story.score}</p>
          <button className={`${styles['item__rating-button']} ${styles['item__rating-button_up']}`}></button>
        </div>
      </div>
    </div>
  );
};

export default StoryItem;
