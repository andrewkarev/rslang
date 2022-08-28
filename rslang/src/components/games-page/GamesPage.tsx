import React, { useEffect, useRef, useState } from 'react';
import GameCard from './game-card/GameCard';
import gamesData from '../../data/games-data';
import styles from './games-page.module.css';
import SprintGame from './games/sprint-game/SprintGame';
import IWord from '../../types/services-interfaces/IWord';
import { learnWordAPI } from '../..';
import shuffle from '../../services/shuffle';
import GameResults from './games/game-results/GameResults';

const GamesPage = () => {
  const [choosenGame, setChoosenGame] = useState('');

  const handleGameChoice = (choice: string) => {
    setChoosenGame(choice);
  }

  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [lastGameResults, setLastGameResults] = useState<{ word: IWord, isCorrect: boolean }[] | []>([]);

  const words = useRef<IWord[] | []>([]);

  useEffect(() => {
    const getWords = async () => {
      const wordsList = await learnWordAPI.getWords(0, 0);

      if (wordsList) {
        words.current = shuffle(wordsList);
      }
    }

    getWords();
  }, []);

  const gameElements = gamesData.map((game, index) => {
    return (
      <GameCard
        name={game.name}
        description={game.description}
        key={'game' + index}
        handleGameChoice={handleGameChoice}
      />
    )
  });

  const gamesPage = (
    <div className={styles['games-page']}>
      <div className={styles['wrapper'] + ' ' + styles['games-page-wrapper']}>
        <h2 className={styles['title']}>Игры</h2>
        <div className={styles['games-container']}>
          {gameElements}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {!choosenGame && !isResultsVisible && gamesPage}
      {!isResultsVisible && choosenGame === 'Спринт'
        ? <SprintGame
          words={words.current}
          closeGame={handleGameChoice}
          setLastGameResults={setLastGameResults}
          setIsResultsVisible={setIsResultsVisible}
        />
        : ''}
      {isResultsVisible && <GameResults
        lastGameResults={lastGameResults}
        setIsResultsVisible={setIsResultsVisible}
      />}
    </>
  );
}

export default GamesPage;