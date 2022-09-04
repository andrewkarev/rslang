import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { learnWordAPI } from '../../../..';
import { AuthorisationContext } from '../../../../context/AuthorisationContext';
import getCurrentDate from '../../../../services/get-current-date';
import IWord from '../../../../types/services-interfaces/IWord';
import styles from './game-results.module.css';
import ResultWord from './result-word/ResultWord';

interface GameResultsProps {
  choosenGame: string,
  lastGameResults: { word: IWord, isCorrect: boolean }[] | [],
  sprintNewWords: React.MutableRefObject<number>,
  sprintLearnedWords: React.MutableRefObject<number>,
  audioCallNewWords: React.MutableRefObject<number>,
  audioCallLearnedWords: React.MutableRefObject<number>,
  setIsResultsVisible: (value: React.SetStateAction<boolean>) => void,
  handleGameChoice: (choice: string) => void,
  sprintlongestSreak: React.MutableRefObject<{
    best: number;
    current: number;
  }>,
  audioCallLongestSreak: React.MutableRefObject<{
    best: number;
    current: number;
  }>,
}

const GameResults: React.FunctionComponent<GameResultsProps> = (props) => {
  const { isAuthorised } = useContext(AuthorisationContext)

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

  const updateStatistics = async () => {
    const userId = localStorage.getItem('id');
    const key = getCurrentDate();
    const isSprintGame = props.choosenGame === 'Спринт';
    const isAudioCallGame = props.choosenGame === 'Аудио-вызов';

    const learnedWords = isSprintGame ? props.sprintLearnedWords : props.audioCallLearnedWords;
    const newWords = isSprintGame ? props.sprintNewWords : props.audioCallNewWords;
    const streak = isSprintGame ? props.sprintlongestSreak : props.audioCallLongestSreak;
    streak.current.best = Math.max(streak.current.best, streak.current.current);

    if (!userId) return;

    const newBody = {
      [key]: {
        allAnswers: answersAtAll,
        rightAnswers: correctAnswers,
        learnedWords: learnedWords.current,
        newWords: newWords.current,
        games: {
          sprint: {
            newWords: Number(isSprintGame) && newWords.current,
            rightAnswers: Number(isSprintGame) && correctAnswers,
            longestStreak: Number(isSprintGame) && streak.current.best,
            allAnswers: Number(isSprintGame) && answersAtAll,
          },
          audioCall: {
            newWords: Number(isAudioCallGame) && newWords.current,
            rightAnswers: Number(isAudioCallGame) && correctAnswers,
            longestStreak: Number(isAudioCallGame) && streak.current.best,
            allAnswers: Number(isAudioCallGame) && answersAtAll,
          },
        },
      },
    }

    try {
      const userStatistics = await learnWordAPI.getStatistics(userId);

      if (!userStatistics) return;

      let body;

      if (key in userStatistics.optional) {
        const stats = userStatistics.optional[key];

        body = {
          optional: {
            ...userStatistics.optional,
            [key]: {
              allAnswers: stats.allAnswers + answersAtAll,
              rightAnswers: stats.rightAnswers + correctAnswers,
              learnedWords: stats.learnedWords + learnedWords.current,
              newWords: stats.newWords + newWords.current,
              games: {
                sprint: {
                  newWords: stats.games.sprint.newWords + (isSprintGame ? newWords.current : 0),
                  rightAnswers: stats.games.sprint.rightAnswers + (isSprintGame ? correctAnswers : 0),
                  longestStreak: isSprintGame ? Math.max(stats.games.sprint.longestStreak, streak.current.best) : stats.games.sprint.longestStreak,
                  allAnswers: stats.games.sprint.allAnswers + (isSprintGame ? answersAtAll : 0),
                },
                audioCall: {
                  newWords: stats.games.audioCall.newWords + (isAudioCallGame ? newWords.current : 0),
                  rightAnswers: stats.games.audioCall.rightAnswers + (isAudioCallGame ? correctAnswers : 0),
                  longestStreak: isAudioCallGame ? Math.max(stats.games.audioCall.longestStreak, streak.current.best) : stats.games.audioCall.longestStreak,
                  allAnswers: stats.games.audioCall.allAnswers + (isAudioCallGame ? answersAtAll : 0),
                },
              },
            },
          }
        };
      } else {
        body = {
          optional: {
            ...userStatistics.optional,
            ...newBody,
          }
        };
      }

      learnWordAPI.updateStatistics(userId, body);
    } catch (error) {
      if (!(error instanceof Error)) return;

      if (error.message === '404') {
        console.error('User\'s statistics not found.');

        const body = {
          optional: {
            ...newBody,
          }
        };

        learnWordAPI.updateStatistics(userId, body);
      }
    }

    if (isSprintGame) {
      props.sprintlongestSreak.current = { best: 0, current: 0 };
      props.sprintNewWords.current = 0;
    }

    if (isAudioCallGame) {
      props.audioCallLongestSreak.current = { best: 0, current: 0 };
      props.audioCallNewWords.current = 0;
    }
  };

  const handleButtonClick = async () => {
    props.handleGameChoice('');
    props.setIsResultsVisible(false);

    if (isAuthorised) {
      await updateStatistics();
    }
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
          <NavLink to='/games'>
            <button
              className={styles['to-games-btn']}
              onClick={handleButtonClick}
            >
              К играм
            </button>
          </NavLink>
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
