import React, { useEffect, useRef, useState } from 'react';
import GameCard from './game-card/GameCard';
import gamesData from '../../data/games-data';
import styles from './games-page.module.css';
import SprintGame from './games/sprint-game/SprintGame';
import IWord from '../../types/services-interfaces/IWord';
import { learnWordAPI } from '../..';
import shuffle from '../../services/shuffle';
import GameResults from './games/game-results/GameResults';
import getRandomPages from '../../services/get-random-pages';

const GamesPage = () => {
  const sprintlongestSreak = useRef<{ best: number, current: number }>({
    best: 0,
    current: 0,
  });

  const [choosenGame, setChoosenGame] = useState('');
  const [chosenGameCard, setChosenGameCard] = useState({
    sprint: false, audioCall: false,
  });


  const handleGameChoice = (choice: string) => {
    setChoosenGame(choice);
  }

  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [wordsGroup, setWordsGroup] = useState(0);
  const [lastGameResults, setLastGameResults] = useState<{
    word: IWord, isCorrect: boolean
  }[] | []>([]);

  const words = useRef<IWord[] | []>([]);

  useEffect(() => {
    const getWords = async () => {
      const pagesToUseInGame = getRandomPages();
      const request: Promise<IWord[] | void>[] = [];

      for (let page of pagesToUseInGame) {
        request.push(learnWordAPI.getWords(wordsGroup, page));
      }

      const response = await Promise.all(request);
      let wordsList: IWord[] = [];

      for (let list of response) {
        if (list) {
          wordsList = wordsList.concat(list);
        }
      }

      words.current = shuffle(wordsList);
    }
    getWords();
  }, [wordsGroup]);

  const gameElements = gamesData.map((game, index) => {
    return (
      <GameCard
        name={game.name}
        description={game.description}
        key={'game' + index}
        handleGameChoice={handleGameChoice}
        setWordsGroup={setWordsGroup}
        chosenGameCard={chosenGameCard}
        setChosenGameCard={setChosenGameCard}
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
          longestSreak={sprintlongestSreak}
        />
        : ''}
      {isResultsVisible && <GameResults
        lastGameResults={lastGameResults}
        setIsResultsVisible={setIsResultsVisible}
        choosenGame={choosenGame}
        handleGameChoice={handleGameChoice}
        sprintlongestSreak={sprintlongestSreak}
      />}
    </>
  );
}

export default GamesPage;