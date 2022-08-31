import React from 'react';
import { NavLink } from 'react-router-dom';
import IWord from '../../../../types/services-interfaces/IWord';
import styles from './game-results.module.css';
import ResultWord from './result-word/ResultWord';

interface GameResultsProps {
  choosenGame: string,
  lastGameResults: { word: IWord, isCorrect: boolean }[] | [],
  setIsResultsVisible: (value: React.SetStateAction<boolean>) => void,
  handleGameChoice: (choice: string) => void,
  sprintlongestSreak: React.MutableRefObject<{
    best: number;
    current: number;
  }>,
}

const GameResults: React.FunctionComponent<GameResultsProps> = (props) => {
  const resultsContent = props.lastGameResults
    .map((result) => <ResultWord result={result} key={result.word.id} />);

  const correctAnswers = props.lastGameResults
    .filter((result) => result.isCorrect).length;

  const titles = [
    'Неплохой результат.',
    'Хороший результат.',
    'Отличный результат!',
    'Превосходный результат!',
  ];

  const answersAtAll = props.lastGameResults.length;
  const percentOfCoreectAnswers = correctAnswers / answersAtAll;
  const titleIndex = Math.floor(titles.length * percentOfCoreectAnswers - 1);

  const handleButtonClick = async () => {
    props.handleGameChoice('');
    props.setIsResultsVisible(false);
  };

  return (
    <div className={styles['wrapper']}>
      <div className={styles['game-results-container']}>
        <h2 className={styles['title']}>
          {titles[titleIndex] || 'Результат'}
        </h2>
        <h3 className={styles['sub-title']}>
          {correctAnswers} из {answersAtAll}
        </h3>
        <div className={styles['game-results']}>
          <table className={styles['results-table']}>
            <tbody>
              {resultsContent}
            </tbody>
          </table>

        </div>
        <div className={styles['controls-container']}>
          <button
            className={styles['to-games-btn']}
            onClick={handleButtonClick}
          >
            К играм
          </button>
          <NavLink to='/textbook'>
            <button
              className={styles['to-textbook-btn']}
              onClick={handleButtonClick}
            >
              К учебнику
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default GameResults;
