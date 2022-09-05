import React, { useEffect, useState } from 'react';
import styles from './main-page.module.css';
import HeroPages from './hero-page/HeroPage';
import Advantages from './advantagies/Advantages';
import Presentation from './presentation/Presentation';
import DevTeam from './dev-team/DevTeam';
import Scroll from './scroll-up/Scroll'

interface MainPageProps {
  toggleModalVisability: () => void;
}

const MainPage: React.FC<MainPageProps> = ({ toggleModalVisability }) => {
  const offsetLimit = 90;
  const [topOffset, setTopOffset] = useState(0);

  const handleScroll = () => {
    setTopOffset(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles["main-page"]}>
      <HeroPages toggleModalVisability={toggleModalVisability} />
      <Advantages toggleModalVisability={toggleModalVisability} />
      <Presentation />
      <DevTeam />
      {topOffset > offsetLimit && <Scroll />}
    </div>
  );
};

export default MainPage;
