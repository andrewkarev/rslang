import React from 'react';
import styles from './pagination.module.css';

const Pagination = () => {
  const MAX_PAGE = 30;
  const currentPage = 1;

  const pagesData = new Array(7).fill(0).map((page, index) => {
     
      if (index === 0) return 1;
      if (index === 6) return MAX_PAGE;

      if (currentPage < 4 && index < 5) return index + 1;
      if (currentPage < 4) return '...';

      if (currentPage > MAX_PAGE - 4 && index > 1) return MAX_PAGE - (7 - index) + 1;
      if (currentPage > MAX_PAGE - 4) return '...'

      if (index === 2) return currentPage - 1;
      if (index === 3) return currentPage;
      if (index === 4) return currentPage + 1;

      return '...';
  });

  const pageElements = pagesData.map((page, index) => {
    return (
      <button 
        className={ 'btn ' + styles['round-btn'] + (page === currentPage ? (' ' + styles['active']) : '') } 
        key={ index + 'page' }
      >
          { page }
      </button>
    )
  });

  return (
    <div className={ styles['pagination'] }>
      <div className={ styles['pagination-wrapper'] }>
        <button className={'btn ' + styles['round-btn'] }>&#60;</button>
        { pageElements }
        <button className={'btn ' + styles['round-btn'] }>&#62;</button>
      </div>
    </div>
  )
}

export default Pagination;