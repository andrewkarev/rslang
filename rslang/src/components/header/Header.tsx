import React from 'react';
import Navigation from './navigation/Navigation';
import styles from './header.module.css';
import RegistrationBtn from './registration-btn/RegistrationBtn';
import { NavLink, useLocation } from "react-router-dom";

interface HeaderProps {
  toggleModalVisability: () => void,
}

const Header: React.FunctionComponent<HeaderProps> = ({ toggleModalVisability }) => {
  let location = useLocation();

  return (
    <div 
      className={`${styles['header']} ${(location.pathname !== '/') 
        ? styles['shadowed'] 
        : ''}`}
    >
      <div className={styles['wrapper'] + ' ' + styles['header-wrapper']}>
        <NavLink to={'/'}>
          <h1 className={styles['logo']}>EasyLang</h1>
        </NavLink>
        
        <div className={styles['nav-container']}>
          <Navigation />
          <RegistrationBtn
            toggleModalVisability={toggleModalVisability}
            isHeaderButton={true} />
        </div>
      </div>
    </div>
    
  );
};

export default Header;