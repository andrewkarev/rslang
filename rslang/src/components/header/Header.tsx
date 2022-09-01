import React from "react";
import { NavLink } from "react-router-dom";
import Navigation from "./navigation/Navigation";
import styles from './header.module.css';

const Header = () => {
  return (
    <div className={ styles['header'] }>
      <div className={ styles['wrapper'] +' ' + styles['header-wrapper'] }>
        <NavLink to={'/'}>
          <h1 className={ styles['logo']}>EasyLang</h1> 
        </NavLink>
        <Navigation />
        <button className={ styles['button']} type="button">
          <span className={ styles['button-title']}>Войти</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
