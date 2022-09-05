import React, { useState } from "react";
import styles from './navigation.module.css';
import NavList from "./navlist/NavList";

const Navigation = () => {

  const [opened, setOpened] = useState(false);

  const toggleMenu = () => {
    const body = document.querySelector('body');

    if (!body) return;

    if (!opened) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }

    setOpened(!opened);
  }

  return (
    <nav className={styles["nav"]}>
      <NavList isOpened={opened} toggleMenu={toggleMenu} />
      <div
        className={styles["burger"]}
        onClick={toggleMenu}
      >
        <span className={styles["burger-line"]}></span>
        <span className={styles["burger-line"]}></span>
        <span className={styles["burger-line"]}></span>
      </div>
    </nav>
  );
}

export default Navigation;
