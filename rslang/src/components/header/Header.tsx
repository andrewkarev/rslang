import React from "react";
import Navigation from "./navigation/Navigation";
import './header.css';

interface HeaderProps {
  toggleModalVisability: () => void,
}

const Header: React.FunctionComponent<HeaderProps> = ({ toggleModalVisability }) => {
  return (
    <div className="header">
      <div className="wrapper header-wrapper">
        <div className="logo">
          RSlanguoLeo
        </div>
        <Navigation />
        <button className="button" type="button" onClick={toggleModalVisability}>
          Войти
        </button>
      </div>
    </div>
  );
};

export default Header;
