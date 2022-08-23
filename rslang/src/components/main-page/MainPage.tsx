import React from 'react';
import styles from './main-page.module.css';
import Header from '../header/Header';

const MainPage = () => {
  return (
    <div className={ styles["main-page"]}>
      <div className={ styles['wrapper']}>
      <Header />
      </div>
    </div>
  );
};

export default MainPage;
