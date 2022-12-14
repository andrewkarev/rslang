import React from 'react';
import styles from './footer.module.css'
import logo from '../../assets/icons/rs_school_js.svg'
import github from '../../assets/icons/github.svg';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  let location = useLocation();

  return(
    <div className={`${styles['footer']} ${(location.pathname !== '/')
      ? styles['shadowed']
      : ''}`}>
      <div className={ styles["wrapper"]}>
        <div className={ styles["content"]}>
          <div className={ styles["year"]}>2022</div>
          <div className={ styles["logo-conteiner"]}>
            <a href="https://rs.school/js/">
              <img className={ styles['logo']} src={logo} alt='logo'></img>
            </a>
          </div>
          <div className={ styles['developer']}>
      
            <a className={ styles['link']} href='https://github.com/andrewkarev' data-tooltip="Андрей">
              <img className={ styles['github'] } src={github} alt="github" />
            </a>
            <a className={ styles['link']} href='https://github.com/kritskaya' data-tooltip="Татьяна">
              <img className={ styles['github'] } src={github} alt="github" />
            </a>
            <a className={ styles['link']} href='https://github.com/RabykoSasha' data-tooltip="Александр">
              <img  className={ styles['github'] } src={github} alt="github" />
            </a>            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;