import React from 'react';
import Levels from './levels/Levels';
import TextbookCards from './textbook-cards/TextbookCards';
import SelectedCard from './selected-card/SelectedCard';
import Pagination from './pagination/Pagination';
import Games from './games/Games';
import styles from './textbook.module.css';

const Textbook = () => {
  return (
    <>
      <div className={styles['textbook']}>
        <div className={styles['wrapper'] + ' textbook-wrapper'}>
          <h2 className={styles['title']}>Учебник</h2>
          <Levels />
          <div className="book-wrapper a1-level-group" data-level="A">
            <h2 className={styles['title']}>Слова</h2>
            <div className={styles['book-page-wrapper']}>
              <TextbookCards />
              <SelectedCard />
            </div>
            <Pagination />
          </div>
          <Games />
        </div>
      </div>
    </>
  );
}

export default Textbook;
