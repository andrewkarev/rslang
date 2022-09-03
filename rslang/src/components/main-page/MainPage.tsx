import React from 'react';
import styles from './main-page.module.css';
import HeroPages from './hero-page/HeroPage';
import Advantagies from './advantagies/Advantagies';
import Presentation from './presentation/Presentation';
import DevTeam from './dev-team/DevTeam';
import Scroll from './scroll-up/Scroll'

const MainPage = () => {
  return (
    <div className={ styles["main-page"]}>
      <HeroPages />
      <Advantagies />
      <Presentation />
      <DevTeam />
      <Scroll />
      </div>
  );
};

export default MainPage;
