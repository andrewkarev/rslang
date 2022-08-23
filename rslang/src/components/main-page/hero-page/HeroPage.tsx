import React from 'react';
import styles from './hero-page.module.css';
import logo from '../../../assets/images/dictionary.png';

const HeroPages = () => {
  return (
    <section className={ styles['hero-page']}>
      <div className={ styles['wrapper']}>
        <div className={ styles['content']}>
          <div className={ styles['about-app']}>
            <h2>Изучай английский с RSLanguoLeo</h2>
            <p className={ styles['subtitle']}>Приложение для изучения английских слов. Для зарегистрированных пользователй - шире фукциональные возможности.</p>
            <button className={ styles['button']}>Зарегистрироваться</button>
          </div>
        <img className={ styles['img']} src={logo} alt="rslang"></img>
        </div>
      </div>
    </section>
  )
}

export default HeroPages;