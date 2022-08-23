import React from "react";
import Navigation from "./navigation/Navigation";
import styles from './header.module.css';

const Header = () => {
  return (
    <div className={ styles['header'] }>
      <div className={ styles['wrapper'] +' ' + styles['header-wrapper'] }>
        <a className={ styles['logo-link']} href='/'>
          <h1 className={ styles['logo']}>RSlanguoLeo</h1> 
        </a>
        <Navigation />
        <button className={ styles['button']} type="button">
          Войти
        </button>
      </div>
    </div>
  );
};

export default Header;
