import React from "react";
import { NavLink } from "react-router-dom";
import './navigation.css';

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
      <li className="nav-item" key={item.name}>
        <NavLink to={`${item.url}`}>{item.name}</NavLink>
      </li>
    );
  });

  return (
    <nav className="nav">
      <ul className="nav-list">
        {navElements}
      </ul>
    </nav>

  );
}

export default Navigation;
