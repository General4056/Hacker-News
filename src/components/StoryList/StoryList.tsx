import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IStory } from '../../types/types';
import { createPages } from '../../utils/pagesCreator';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import StoryItem from '../StoryItem/StoryItem';
import styles from './StoryList.module.css';

interface StoryItemProps {
  stories: IStory[];
  isLoading: boolean;
  withComments: boolean;
  isSavedStories?: boolean;
}

const StoryList: FC<StoryItemProps> = ({ stories, isLoading, withComments, isSavedStories = false }) => {
  const [openedId, setOpenedId] = useState<number | null>(null);

  const [pagesCount, setPagesCount] = useState<number>(0);
  const [pagesArray, setPagesArray] = useState<number[]>([]);
  const [storiesOnPage, setStoriesOnPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [renderedStories, setRenderedStories] = useState<IStory[]>();

  useEffect(() => {
    if (!isSavedStories) {
      const lastIndex = currentPage * storiesOnPage;
      const firstIndex = lastIndex - storiesOnPage;
      setRenderedStories(stories.slice(firstIndex, lastIndex));
    } else {
      setRenderedStories(stories);
    }
  }, [currentPage, stories, storiesOnPage, isSavedStories]);

  useEffect(() => {
    setPagesCount(Math.ceil(stories.length / storiesOnPage));
  }, [stories, storiesOnPage]);

  useEffect(() => {
    setPagesArray(createPages(pagesCount, currentPage));
  }, [pagesCount, currentPage]);

  function setPage(page: number) {
    setCurrentPage(page);
  }

  function handleIdChange(id: number) {
    setOpenedId(id);
  }

  return (
    <>
      <div className={styles.stories}>
        {isLoading === true ? (
          <div className={styles.stories__loader}>
            <Loader />
          </div>
        ) : (
          <>
            {renderedStories &&
              renderedStories.map((story) => {
                return (
                  <StoryItem
                    story={story}
                    key={story.id}
                    withComments={withComments}
                    handleIdChange={handleIdChange}
                    openedId={openedId}
                  />
                );
              })}
            {!isSavedStories && (
              <Pagination pagesArray={pagesArray} setPage={setPage} currentPage={currentPage} pages={pagesCount} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default StoryList;
