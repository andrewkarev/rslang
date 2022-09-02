import React from 'react';
import Navigation from './navigation/Navigation';
import styles from './header.module.css';
import RegistrationBtn from './registration-btn/RegistrationBtn';
import { NavLink } from "react-router-dom";

interface HeaderProps {
  toggleModalVisability: () => void,
}

const Header: React.FunctionComponent<HeaderProps> = ({ toggleModalVisability }) => {
  return (
    <div className={ styles['header'] }>
      <div className={ styles['wrapper'] +' ' + styles['header-wrapper'] }>
        <NavLink to={'/'}>
          <h1 className={ styles['logo']}>EasyLang</h1> 
        </NavLink>
        <Navigation />
        <RegistrationBtn handler={toggleModalVisability} />
      </div>
    </div>
  );
};

export default Header;