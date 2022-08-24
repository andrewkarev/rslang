import React from 'react';
import styles from './main-page.module.css';
import Header from '../header/Header';
import HeroPages from './hero-page/HeroPage';
import Adventagies from './adventagies/Adventagies';
import Presentation from './presentation/Presentation';
import DevTeam from './dev-team/DevTeam';
import Footer from '../footer/Footer';

const MainPage = () => {
  return (
    <div className={ styles["main-page"]}>
      <Header />
      <HeroPages />
      <Adventagies />
      <Presentation />
      <DevTeam />
      <Footer />
      </div>
  );
};

export default MainPage;
