import React from 'react';
import styles from './main-page.module.css';
import Header from '../header/Header';
import HeroPages from './hero-page/HeroPage'

const MainPage = () => {
  return (
    <div className={ styles["main-page"]}>
      {/* <div className={ styles['wrapper']}> */}
      <Header />
      <HeroPages />
      </div>
    // </div>
  );
};

export default MainPage;
