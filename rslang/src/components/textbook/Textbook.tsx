import React from 'react';
import Header from '../header/Header';
import Levels from './levels/Levels';
import './textbook.css';

const Textbook = () => {
  return (
    <>
      <Header />
      <div className="textbook">
        <div className="wrapper textbook-wrapper">
          <h2 className="title">Учебник</h2>
          <Levels />
        </div>
      </div>
    </>
  );
}

export default Textbook;
