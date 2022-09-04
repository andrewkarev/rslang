import React, { useEffect, useState } from 'react';
import GameCard from './game-card/GameCard';
import gamesData from '../../data/games-data';
import styles from './games-page.module.css';
import SprintGame from './games/sprint-game/SprintGame';
import IWord from '../../types/services-interfaces/IWord';
import { learnWordAPI } from '../..';
import shuffle from '../../services/shuffle';
import GameResults from './games/game-results/GameResults';
import getRandomPages from '../../services/get-random-pages';
import AudioCallGame from './games/audiocall-game/AudioCall';

type GamesPageProps = {
  choosenGame: string,
  isResultsVisible: boolean,
  handleGameChoice: (choice: string) => void;
  setIsResultsVisible: (value: React.SetStateAction<boolean>) => void,
  words: React.MutableRefObject<[] | IWord[]>;
  sprintlongestSreak: React.MutableRefObject<{
    best: number;
    current: number;
  }>,
  sprintNewWords: React.MutableRefObject<number>,
  sprintLearnedWords: React.MutableRefObject<number>,
  audioCallLongestSreak: React.MutableRefObject<{
    best: number;
    current: number;
  }>,
  audioCallNewWords: React.MutableRefObject<number>,
  audioCallLearnedWords: React.MutableRefObject<number>,
  lastGameResults: { word: IWord, isCorrect: boolean }[] | [],
  setLastGameResults: React.Dispatch<React.SetStateAction<[] | {
    word: IWord;
    isCorrect: boolean;
  }[]>>
};

const GamesPage: React.FC<GamesPageProps> = ({
  choosenGame,
  isResultsVisible,
  words,
  handleGameChoice,
  setIsResultsVisible,
  sprintlongestSreak,
  sprintNewWords,
  sprintLearnedWords,
  audioCallLongestSreak,
  audioCallNewWords,
  audioCallLearnedWords,
  lastGameResults,
  setLastGameResults,
}) => {
  const [chosenGameCard, setChosenGameCard] = useState({
    sprint: false, audioCall: false,
  });

  const [wordsGroup, setWordsGroup] = useState(0);

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
  }, [wordsGroup, words]);

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
      {!isResultsVisible && choosenGame === 'Спринт' && <SprintGame
        words={words.current}
        choosenGame={choosenGame}
        closeGame={handleGameChoice}
        setLastGameResults={setLastGameResults}
        setIsResultsVisible={setIsResultsVisible}
        longestSreak={sprintlongestSreak}
        sprintNewWords={sprintNewWords}
        sprintLearnedWords={sprintLearnedWords}
      />}
      {!isResultsVisible && choosenGame === 'Аудио-вызов' && <AudioCallGame
        words={words.current}
        choosenGame={choosenGame}
        closeGame={handleGameChoice}
        setLastGameResults={setLastGameResults}
        setIsResultsVisible={setIsResultsVisible}
        longestSreak={audioCallLongestSreak}
        audioCallNewWords={audioCallNewWords}
        audioCallLearnedWords={audioCallLearnedWords}
      />
      }
      {isResultsVisible && <GameResults
        lastGameResults={lastGameResults}
        setIsResultsVisible={setIsResultsVisible}
        choosenGame={choosenGame}
        handleGameChoice={handleGameChoice}
        sprintlongestSreak={sprintlongestSreak}
        audioCallLongestSreak={audioCallLongestSreak}
        sprintNewWords={sprintNewWords}
        sprintLearnedWords={sprintLearnedWords}
        audioCallNewWords={audioCallNewWords}
        audioCallLearnedWords={audioCallLearnedWords}
      />}
    </>
  );
}

export default GamesPage;