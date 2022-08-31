import React, { useState } from 'react';
import styles from './pagination.module.css';

type Props = {
  currentStatus: {currentLevel: number, currentCard: number, currentPage: number};
  isLearnedPage: boolean;
  setCurrentStatus: (status: {currentLevel: number, currentCard: number, currentPage: number}) => void;
}

const Pagination: React.FC<Props> = ({ currentStatus, isLearnedPage, setCurrentStatus }) => {
  const FIRST_PAGE = 1;
  const MAX_PAGE = 30;

  const FIRST_INDEX = 0;
  const SECOND_INDEX = 1;
  const BEFORE_LAST_INDEX = 5;
  const LAST_INDEX = 6;

  const FIRST_GROUP_BTN_INDEX = 2;
  const SECOND_GROUP_BTN_INDEX = 3;
  const THIRD_GROUP_BTN_INDEX = 4;

  const MAX_CONSECUTIVE_PAGES_NUMBER = 5;

  const currentPage = currentStatus.currentPage;
 
  const pagesData = new Array(7).fill(0).map((page, index) => {
    if (index === FIRST_INDEX) return FIRST_PAGE;
    if (index === LAST_INDEX) return MAX_PAGE;

    if (currentPage < MAX_CONSECUTIVE_PAGES_NUMBER - 1 && index < BEFORE_LAST_INDEX) return index + 1;
    if (currentPage < MAX_CONSECUTIVE_PAGES_NUMBER - 1) return '...';

    if (currentPage > MAX_PAGE - MAX_CONSECUTIVE_PAGES_NUMBER && index > SECOND_INDEX) return MAX_PAGE - LAST_INDEX + index;
    if (currentPage > MAX_PAGE - MAX_CONSECUTIVE_PAGES_NUMBER) return '...'

    if (index === FIRST_GROUP_BTN_INDEX) return currentPage;
    if (index === SECOND_GROUP_BTN_INDEX) return currentPage + 1;
    if (index === THIRD_GROUP_BTN_INDEX) return currentPage + 2;

    return '...';
  });

  const handlePageClick = (index: number) => {
    
    setCurrentStatus({ ...currentStatus, currentPage: index, currentCard: 0 });
    
    localStorage.setItem('page', `${index}`);
    localStorage.setItem('card', '0');
  }

  const pageElements = pagesData.map((page, index) => {
    return (
      <button 
        className={ `btn ${styles['round-btn']} ${(page === currentPage + 1 ? styles['active'] : '')} ${isLearnedPage ? styles['learned'] : ''}`} 
        disabled={ page === '...' ? true : false}
        key={ 'page-' + index }
        title={ `${page === currentPage + 1 && isLearnedPage ? 'Страница изучена' : ''}` }
        onClick={ handlePageClick.bind(null, Number(page) - 1) }
      >
          { page }
      </button>
    )
  });

  return (
    <div className={ styles['pagination'] }>
      <div className={ styles['pagination-wrapper'] }>
        <button 
          className={'btn ' + styles['round-btn'] }
          disabled={ !currentStatus.currentPage ? true : false }
          onClick={ handlePageClick.bind(null, currentStatus.currentPage - 1) }
        >
          &#60;
        </button>
        { pageElements }
        <button 
          className={'btn ' + styles['round-btn'] }
          disabled={ currentStatus.currentPage === MAX_PAGE - 1 ? true : false }
          onClick={ handlePageClick.bind(null, currentStatus.currentPage + 1) }
        >
          &#62;
        </button>
      </div>
    </div>
  )
}

export default Pagination;