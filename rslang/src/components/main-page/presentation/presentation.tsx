import React from 'react';
import styles from './presentation.module.css'

const Presentation = () => {
  return (
    <section className={ styles['presentation']}>
      <div className={ styles['wrapper'] + ' ' + styles['presentation__wrapper']}>
        <h2 className={ styles['presentation-title']}>Добро пожаловать в RSLanguoLeo</h2>
          <div className={ styles['adventagies-content']}>
          <iframe src="https://www.youtube.com/embed/0AohM_oOjBc"
          title="YouTube video player" allow="accelerometer; autoplay; clipboard-write;
          encrypted-media; gyroscope; picture-in-picture; fullscreen"></iframe>
        </div>        
    </div>
  </section>
  )
}

export default Presentation;