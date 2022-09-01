import React from 'react';
import styles from './main-page.module.css';
import Header from '../header/Header';
import HeroPages from './hero-page/HeroPage';
import Advantagies from './advantagies/Advantagies';
import Presentation from './presentation/Presentation';
import DevTeam from './dev-team/DevTeam';
import Footer from '../footer/Footer';
import Scroll from './scroll-up/Scroll'

const MainPage = () => {
  return (
    <div className={ styles["main-page"]}>
      <Header />
      <HeroPages />
      <Advantagies />
      <Presentation />
      <DevTeam />
      <Scroll />
      <Footer />
      </div>
  );
};

export default MainPage;
