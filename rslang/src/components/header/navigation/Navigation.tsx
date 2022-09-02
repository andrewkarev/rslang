import React from "react";
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

  const navElements = navItems.map((item) => {
    return (
      <li className={ styles["nav-item"]} key={item.name}>
        <NavLink to={`${item.url}`}>{item.name}</NavLink>
      </li>
    );
  });

  return (
    <nav className={ styles["nav"] }>
      <ul className={ styles["nav-list"]}>
        {navElements}
      </ul>
    </nav>

  );
}

export default Navigation;
