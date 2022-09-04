import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from './navigation.module.css';

const Navigation = () => {
  const navItems = [
    {
      name: 'Главная',
      url: '/',
    },
    {
      name: 'Учебник',
      url: '/textbook',
    },
    {
      name: 'Игры',
      url: '/games',
    },
    {
      name: 'Статистика',
      url: '/statistics',
    }
  ];

  const [opened, setOpened] = useState(false);

  const navElements = navItems.map((item) => {
    return (
      <li className={ styles["nav-item"]} key={item.name} onClick= { () => { setOpened(!opened) }  }>
        <NavLink to={`${item.url}`}>{item.name}</NavLink>
      </li>
    );
  });

  const handleBurgerClick = () => {
    setOpened(!opened);
  }

  return (
    <nav className={ styles["nav"] }>
      <ul className={ `${styles["nav-list"]} ${opened ? styles['active'] : ''}`}>
        {navElements}
      </ul>
      <div 
        className={ styles["burger"] }
        onClick={ handleBurgerClick }
      >
        <span className={ styles["burger-line"] }></span>
        <span className={ styles["burger-line"] }></span>
        <span className={ styles["burger-line"] }></span>
      </div>
    </nav>

  );
}

export default Navigation;
