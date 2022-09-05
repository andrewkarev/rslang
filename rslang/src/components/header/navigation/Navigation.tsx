import React, { useEffect, useRef, useState } from "react";
import styles from './navigation.module.css';
import NavList from "./navlist/NavList";

const Navigation = () => {
  const body = useRef(document.querySelector('body'));

  const [opened, setOpened] = useState(false);

  const toggleMenu = () => {
    if (!body.current) return;

    body.current.style.overflow = 'auto';
    setOpened(false);
  }

  const openBurgerMenu = () => {
    if (!body.current) return;

    body.current.style.overflow = 'hidden';
    setOpened(true);
  }

  const trackWindowWidth = () => {
    if (window.innerWidth >= 801) {
      if (!body.current) return;

      body.current.style.overflow = 'auto';
      setOpened(false);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', trackWindowWidth);
    return () => window.removeEventListener('resize', trackWindowWidth);
  }, []);

  return (
    <nav className={styles["nav"]}>
      <NavList isOpened={opened} toggleMenu={toggleMenu} />
      <div
        className={styles["burger"]}
        onClick={openBurgerMenu}
      >
        <span className={styles["burger-line"]}></span>
        <span className={styles["burger-line"]}></span>
        <span className={styles["burger-line"]}></span>
      </div>
    </nav>
  );
}

export default Navigation;
