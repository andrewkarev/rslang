import React from 'react';
import styles from './games.module.css';
import sprintImage from './../../../assets/images/sprint.png';
import audioCallImage from './../../../assets/images/audio-call.png';
import Game from './game/Game';

const Games = () => {
  const gamesData = [
    { 
      name: 'Спринт', 
      description: 'Спринт - тренировка на скорость, В Вашем распоряжении 30 секунд, за которые необходимо угадать как можно больше слов', 
      image: sprintImage 
    },
    { 
      name: 'Аудио-вызов', 
      description: 'Аудио-вызов - тренировка на слух: улучшает восприятие слов, используя для этого такой метод обучения как аудирование', 
      image: audioCallImage 
    }
  ];

  const gameElements = gamesData.map((game) => {
    return (
      <Game name={ game.name } description={ game.description } image={ game.image }/>
    )
  });

  return (
    <div className={ styles['games'] }>
      <h2 className={ styles['title'] }>Игры</h2>
      <p className={ styles['description'] }>Закрепите слова с текущей страницы при помощи игр</p>
      <div className={ styles['games-wrapper'] }>
        { gameElements }
      </div>
    </div>
  );
}

export default Games;