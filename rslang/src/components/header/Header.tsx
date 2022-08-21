import React from "react";
import Navigation from "./navigation/Navigation";
import './header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="wrapper header-wrapper">
        <div className="logo">
          RSlanguoLeo
        </div>
        <Navigation />
        <button className="button" type="button">
          Войти
        </button>
      </div>
    </div>
  );
};

export default Header;
