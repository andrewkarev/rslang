import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './presentation.module.css'

const Presentation = () => {
  const { ref: presentationRef, inView: isPresentationVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section className={styles['presentation']} ref={presentationRef}>
      <div className={styles['wave']}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path fill='#f5f3f9' d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={styles['shape-fill']}></path>
        </svg>
      </div>
      <div
        className={`${styles['wrapper']} ${styles['presentation__wrapper']} ${isPresentationVisible ? styles['animate'] : ''}`}
      >
        <h2 className={styles['title']}>Добро пожаловать в EasyLang</h2>
        <div className={styles['video-container']}>
          <iframe src="https://www.youtube.com/embed/0AohM_oOjBc"
            title="YouTube video player" allow="accelerometer; autoplay; clipboard-write;
          encrypted-media; gyroscope; picture-in-picture; fullscreen"></iframe>
        </div>
      </div>
      <div className={styles['wave'] + ' ' + styles['wave-bottom']}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path fill='#f5f3f9' d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={styles['shape-fill']}></path>
        </svg>
      </div>
    </section>
  )
}

export default Presentation;