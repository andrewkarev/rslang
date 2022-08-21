import React from 'react';
import styles from './games.module.css';
import sprintImage from './../../../assets/images/sprint.png';
import audioCallImage from './../../../assets/images/audio-call.png';

const Games = () => {
  
  return (
    <div className={ styles['games'] }>
      <h2 className={ styles['title'] }>Игры</h2>
      <p className={ styles['description'] }>Закрепите слова с текущей страницы при помощи игр</p>
      <div className={ styles['games-wrapper'] }>
        <div className={ styles['game'] }>
          <h3 className={ styles['game-name'] }>Спринт</h3>
          <div className={ styles['game-description'] }>На время определите, верно ли утвеждение или нет</div>
          <img className={ styles['game-img'] } src={ sprintImage } alt="" />
        </div>
        <div className={ styles['game'] }>
          <h3 className={ styles['game-name'] }>Аудио-вызов</h3>
          <div className={ styles['game-description'] }>Определите на слух, какое слово было произнесено</div>
          <img className={ styles['game-img'] } src={ audioCallImage } alt="" />
        </div>
      </div>
    </div>
  );
}

export default Games;