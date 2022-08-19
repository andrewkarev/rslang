import React from 'react';
import './pagination.css';

const Pagination = () => {
  const MAX_PAGE = 30;
  const currentPage = 10;
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
        className={ 'btn round-btn' + (page === currentPage ? ' active' : '') } 
        key={ index + 'page' }
      >
          { page }
      </button>
    )
  });

  return (
    <div className="pagination">
      <div className="pagination-wrapper">
        <button className="btn round-btn btn-first-page">&#60;</button>
        { pageElements }
        <button className="btn round-btn btn-last-page">&#62;</button>
      </div>
    </div>
  )
}

export default Pagination;