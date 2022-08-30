import React, { useState } from 'react';
import styles from './pagination.module.css';

type Props = {
  currentStatus: {currentLevel: number, currentCard: number, currentPage: number};
  isLearnedPage: boolean;
  setCurrentStatus: (status: {currentLevel: number, currentCard: number, currentPage: number}) => void;
}

const Pagination: React.FC<Props> = ({ currentStatus, isLearnedPage, setCurrentStatus }) => {
  const MAX_PAGE = 30;
  // new
  const currentPage = currentStatus.currentPage;
 
  const pagesData = new Array(7).fill(0).map((page, index) => {
      if (index === 0) return 1;
      if (index === 6) return MAX_PAGE;

      if (currentPage < 4 && index < 5) return index + 1;
      if (currentPage < 4) return '...';

      if (currentPage > MAX_PAGE - 5 && index > 1) return MAX_PAGE - (7 - index) + 1;
      if (currentPage > MAX_PAGE - 5) return '...'

      if (index === 2) return currentPage;
      if (index === 3) return currentPage + 1;
      if (index === 4) return currentPage + 2;

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
        title={ `${isLearnedPage ? 'Страница изучена' : ''}` }
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