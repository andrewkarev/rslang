import React from 'react';
import styles from './sprint-game.module.css';

const SprintGame = () => {
  return (
    <div className={styles['container']}>
      <div className={styles['game-settings']}>
        <div className={styles['close-game']}></div>
        <div className={styles['volume-controls']}></div>
        <div className={styles['fullscreen-mode']}></div>
      </div>
      <div className={styles['game-board']}>
        <div className={styles['game-statistics']}>
          <div className={styles['timer']}>
            <div className={styles['timer-bg']}></div>
            <div className={styles['timer-item']}>60</div>
          </div>
          <div className={styles['score']}>0</div>
        </div>
        <div className={styles['game-field']}>
          <div className={styles['right-answers-counter']}>
            <div className={styles['counter-mark']}>
              <div className={styles['counter-check-mark']}></div>
              <div className={styles['counter-shadow disabled']}></div>
            </div>
            <div className={styles['counter-mark']}>
              <div className={styles['counter-check-mark']}></div>
              <div className={styles['counter-shadow']}></div>
            </div>
            <div className={styles['counter-mark']}>
              <div className={styles['counter-check-mark']}></div>
              <div className={styles['counter-shadow']}></div>
            </div>
          </div>
          <div className={styles['word']}>Word</div>
          <div className={styles['word-translation']}>Перевод</div>
          <div className={styles['control-btns-container']}>
            <button
              className={styles['wrong-answer-btn']}
              type="button"
            >
              Неверно
            </button>
            <button
              className={styles['right-answer-btn']}
              type="button"
            >
              Верно
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SprintGame;
