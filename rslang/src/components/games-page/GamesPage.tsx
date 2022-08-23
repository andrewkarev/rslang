import React from 'react';
import Game from './game/Game';
import gamesData from '../../data/games-data';
import styles from './games-page.module.css';

const GamesPage = () => {
  
  const gameElements = gamesData.map((game, index) => {
    return (
      <Game name={ game.name } description={ game.description } key={ 'game' + index }/>
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