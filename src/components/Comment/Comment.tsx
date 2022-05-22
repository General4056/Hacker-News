import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getItem } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchReplies } from '../../store/reducers/CommentsSlice';
import { IComment, IStory } from '../../types/types';
import Comments from '../Comments/Comments';
import styles from './Comment.module.css';

interface CommentProps {
  isReplies?: boolean;
  comment: IComment;
  parent?: string;
}

const Comment: FC<CommentProps> = ({ comment, parent, isReplies = false }) => {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  let date = new Date(comment.time * 1000);
  let hoursAgo = Math.floor((Date.now() - date.getTime()) / 3600000);
  const dispatch = useAppDispatch();

  function handleRepliesClick() {
    dispatch(fetchReplies({ id: comment.id }));
    setButtonDisabled(true);
  }

  return (
    <>
      <div className={styles.comment}>
        <div className={styles.comment__by}>
          <div className={styles.comment__image}></div>
          <div className={styles.comment__info}>
            <Link to={`/user/${comment.by}`} className={styles.comment__user}>
              {comment.by}
            </Link>
            <p className={styles.comment__time}>{hoursAgo} hours ago</p>
          </div>
        </div>
        <p className={styles.comment__text}>
          {parent && (
            <Link to={`/user/${parent}`} className={styles.comment__parent}>
              @{parent}{' '}
            </Link>
          )}
          {comment.text}
        </p>
        {!isReplies && comment.kids && (
          <button
            onClick={handleRepliesClick}
            className={`${styles['comment__replies-button']}`}
            disabled={buttonDisabled}>
            {comment.kids.length} replies
          </button>
        )}
      </div>
      <div className={styles.replies}>
        {comment.replies &&
          comment.replies.map((item) => {
            return <Comment key={item.id} comment={item} parent={comment.by} isReplies={true} />;
          })}
      </div>
      {/* {comment.kids ? <Comments commentIds={comment.kids} parent={comment.by} /> : <></>} */}
    </>
  );
};

export default Comment;
