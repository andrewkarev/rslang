import React, { useContext } from 'react';
import styles from './hero-page.module.css';
import btnStyles from '../../header/header.module.css';
import RegistrationBtn from '../../header/registration-btn/RegistrationBtn';
import { AuthorisationContext } from '../../../context/AuthorisationContext';
import { NavLink } from 'react-router-dom';

interface HeroPagesProps {
  toggleModalVisability: () => void;
}

const HeroPages: React.FC<HeroPagesProps> = ({ toggleModalVisability }) => {
  const { isAuthorised } = useContext(AuthorisationContext);

  return (
    <section className={styles['hero-page']}>
      <div className={styles['wrapper']}>
      <div className={ styles['conteiner']}>
        <div className={styles['content']}>
          <h2 className={styles['title']}>Изучай английский с EasyLang!</h2>
          <p className={styles['subtitle']}>
            EasyLang — образовательная платформа для изучения и практики иностранного языка, построенная на игровой механике.
          </p>
          {isAuthorised
            ? <NavLink to="textbook">
              <button className={btnStyles['button']}>
                <span className={btnStyles['button-title']}>
                  К учебнику
                </span>
              </button>
            </NavLink>
            : <RegistrationBtn
              toggleModalVisability={toggleModalVisability}
              isHeaderButton={false} />}
        </div>
        </div>
      </div>
      <div className={styles['wave']}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path fill='#F8B81F' d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={styles['shape-fill']}></path>
        </svg>
      </div>
    </section>
  )
}

export default HeroPages;