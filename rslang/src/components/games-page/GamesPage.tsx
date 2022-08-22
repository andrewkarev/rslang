import React from 'react';
import styles from './games-page.module.css';
import Game from './game/Game';

const GamesPage = () => {
  const gamesData = [
    { 
      name: 'Спринт', 
      description: 'Спринт - тренировка на скорость, В Вашем распоряжении 30 секунд, за которые необходимо угадать как можно больше слов', 
    },
    { 
      name: 'Аудио-вызов', 
      description: 'Аудио-вызов - тренировка на слух: улучшает восприятие слов, используя для этого такой метод обучения как аудирование', 
      }
  ];

  const gameElements = gamesData.map((game) => {
    return (
      <Game name={ game.name } description={ game.description } />
    )
  });

  return (
    <>
    <div className={ styles['games-page'] }>
      <div className={ styles['wrapper'] + ' ' + styles['games-page-wrapper']}>
        <h2 className={ styles['title'] }>Игры</h2>
        <div className={ styles['games-container'] }>
          { gameElements }
        </div>
      </div>
    </div>

    
    </>
  );
}

export default GamesPage;