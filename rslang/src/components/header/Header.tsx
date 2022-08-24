import React from 'react';
import Navigation from './navigation/Navigation';
import './header.css';
import RegistrationBtn from './registration-btn/RegistrationBtn';

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
        <RegistrationBtn handler={toggleModalVisability} />
      </div>
    </div>
  );
};

export default Header;
