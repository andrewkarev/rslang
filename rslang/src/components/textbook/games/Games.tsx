import React from 'react';
import styles from './games.module.css';
import sprintImage from './../../../assets/images/sprint.png';
import audioCallImage from './../../../assets/images/audio-call.png';
import gamesData from './../../../data/games-data';
import Game from './game/Game';

type Props = {
  isLearnedPage: boolean;
}

const Games: React.FC<Props> = ({ isLearnedPage }) => {

  const gameElements = gamesData.map((game, index) => {
    return (
      <Game 
        name={ game.name } 
        description={ game.description } 
        image={ game.image } 
        key={ 'game' + index }
        isLearnedPage={ isLearnedPage }
      />
    )
  });

  return (
    <div className={ `${styles['games']}` }>
      <h2 className={ styles['title'] }>Игры</h2>
      <p className={ styles['description'] }>
        {
          !isLearnedPage 
            ? 'Закрепите слова с текущей страницы при помощи игр'
            : 'Игры для данной страницы не доступны'
        }
      </p>
      <div className={ styles['games-wrapper'] }>
        { gameElements }
      </div>
    </div>
  );
}

export default Games;