import React from 'react';
import styles from './pagination.module.css';

const Pagination = () => {
  const MAX_PAGE = 30;
  const currentPage = 1;

  const pagesData = new Array(7).fill(0).map((page, index) => {
    return (
    index === 0 ? index + 1 : 
        index === 6 ? 30 : 
        currentPage < 4 ? index < 5 ? index + 1 : '...' :
        currentPage > MAX_PAGE - 4 ? index > 1 ? MAX_PAGE - (7 - index) + 1  : '...' : 
        index === 2 ? currentPage - 1: 
        index === 3 ? currentPage : 
        index === 4 ? currentPage + 1 : '...'
    )
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