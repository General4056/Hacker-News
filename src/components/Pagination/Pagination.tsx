import { FC, useEffect, useState } from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  pagesArray: number[];
  currentPage: number;
  pages: number;
  setPage: (arg0: number) => void;
}

const Pagination: FC<PaginationProps> = ({ pagesArray, setPage, currentPage, pages }) => {
  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.pagination__button} ${styles.pagination__button_prev}`}
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}></button>
      {pagesArray.map((el) => {
        return (
          <button
            key={el}
            className={
              currentPage === el
                ? `${styles.pagination__item} ${styles.pagination__item_active}`
                : styles.pagination__item
            }
            onClick={() => setPage(el)}>
            <span className={styles.pagination__text}>{el}</span>
          </button>
        );
      })}
      <button
        className={`${styles.pagination__button} ${styles.pagination__button_next}`}
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === pages}></button>
    </div>
  );
};

export default Pagination;
