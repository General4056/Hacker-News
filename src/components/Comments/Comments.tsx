import { FC, useEffect, useState } from 'react';
import { getItem } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchComments } from '../../store/reducers/CommentsSlice';
// import { fetchComments } from '../../store/reducers/StorySlice';
import { IStory } from '../../types/types';
import Comment from '../Comment/Comment';
import styles from './Comments.module.css';

interface CommentsProps {
  commentIds: number[];
  parent?: string;
}

const Comments: FC<CommentsProps> = ({ commentIds, parent }) => {
  const dispatch = useAppDispatch();

  const { comments, commentsStatus } = useAppSelector((store) => store.comments);

  const [innerComments, setInnerComments] = useState<any>([]);

  useEffect(() => {
    dispatch(fetchComments(commentIds));
    // async function fetchData() {
    //   let result = await Promise.all(
    //     commentIds.map(async (id) => {
    //       const response = await getItem(id);
    //       let comment = await response.json();
    //       return comment;
    //     })
    //   );
    //   setInnerComments(result);
    // }
    // fetchData();
  }, []);

  // useEffect(() => {
  //   dispatch(fetchComments(commentIds));
  // }, []);

  return (
    <div className={styles.comments}>
      {comments.map((comment: any) => {
        return <Comment key={comment.id} comment={comment} parent={parent} />;
      })}
    </div>
  );
};

export default Comments;
