import React from 'react';
import Header from '../header/Header';
import Levels from './levels/Levels';
import './textbook.css';
import TextbookCards from './textbook-cards/TextbookCards';

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
            <div className="words-container">
              <TextbookCards />
              {/* <CurrentWord /> */}
            </div>
            {/* <Pagination /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Textbook;
