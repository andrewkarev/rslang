import React from 'react';
import Header from '../header/Header';
import Levels from './levels/Levels';
import './textbook.css';
import TextbookCards from './textbook-cards/TextbookCards';
import SelectedCard from './selected-card/SelectedCard';
import Pagination from './pagination/Pagination';
import Games from './games/Games';

const Textbook = () => {
  return (
    <>
      <Header />
      <div className="textbook">
        <div className="wrapper textbook-wrapper">
          <h2 className="title">Учебник</h2>
          <Levels />
          <div className="book-wrapper a-level-group">
            <h2 className="title">Слова</h2>
            <div className="book-page-wrapper">
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
