import React from 'react';
import styles from './games.module.css';
import gamesData from './../../../data/games-data';
import Game from './game/Game';
import IWord from '../../../types/services-interfaces/IWord';
import IUserWord from '../../../types/services-interfaces/IUserWord';

type Props = {
  isLearnedPage: boolean;
  currentLevelWords: IWord[];
  currentUserWords: IUserWord[];
  currentStatus: { currentLevel: number, currentCard: number, currentPage: number };
}

const Games: React.FC<Props> = ({ isLearnedPage, currentLevelWords, currentUserWords, currentStatus }) => {

  const gameElements = gamesData.map((game, index) => {
    return (
      <Game
        name={game.name}
        description={game.description}
        image={game.image}
        key={'game' + index}
        isLearnedPage={isLearnedPage}
        currentLevelWords={currentLevelWords}
        currentUserWords={currentUserWords}
        currentStatus={currentStatus}
      />
    )
  });

  return (
    <div className={`${styles['games']}`}>
      <h2 className={styles['title']}>Игры</h2>
      <p className={styles['description']}>
        {
          !isLearnedPage
            ? 'Закрепите слова с текущей страницы при помощи игр'
            : 'Игры для данной страницы не доступны'
        }
      </p>
      <div className={styles['games-wrapper']}>
        {gameElements}
      </div>
    </div>
  );
}

export default Games;