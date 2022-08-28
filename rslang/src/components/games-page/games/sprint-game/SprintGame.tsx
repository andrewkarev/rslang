import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './sprint-game.module.css';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import GameSettings from '../game-settings/GameSettings';
import IWord from '../../../../types/services-interfaces/IWord';
import getRandomIndex from '../../../../services/get-random-index';
import AnswersIndicator from './indicator/AnswersIndicator';
import useSound from 'use-sound';
import successSound from '../../../../assets/sounds/sound-of-success.ogg';
import failureSound from '../../../../assets/sounds/sound-of-failure.ogg';

interface SprintGameProps {
  words: IWord[],
  closeGame: (choice: string) => void,
  setLastGameResults: (value: React.SetStateAction<[] | {
    word: IWord;
    isCorrect: boolean;
  }[]>) => void,
  setIsResultsVisible: (value: React.SetStateAction<boolean>) => void,
}

const SprintGame: React.FunctionComponent<SprintGameProps> = (props) => {
  const [seconds, setSeconds] = useState(60);

  const handle = useFullScreenHandle();
  const handleFullScreenButtonClick = () => {
    handle.active ? handle.exit() : handle.enter();
  };

  const wordsInGame = useRef<{ word: IWord, isCorrect: boolean }[]>([]);
  const wordIndex = useRef(0);
  const [cardInner, setCardInner] = useState<{ word: IWord, translation: IWord }>();

  const rightAnswersStreak = useRef(0);
  const multiplierValue = useRef(10);
  const [score, setScore] = useState(0);
  const [scoreMultiplier, setScoreMultiplier] = useState(multiplierValue.current);

  const [isRightButtonLightned, setIsRightButtonLightned] = useState(false);
  const [isWrongButtonLightned, setIsWrongButtonLightned] = useState(false);

  const [isMuted, setIsMuted] = useState(!!localStorage.getItem('isMuted') || false);
  const [onSuccess] = useSound(successSound);
  const [onFailure] = useSound(failureSound);

  const changeSoundState = () => {
    setIsMuted(!isMuted);
  };

  const setMultiplierValue = () => {
    let initialMultiplierValue = 10;

    if (rightAnswersStreak.current >= 4) initialMultiplierValue = 20;
    if (rightAnswersStreak.current >= 8) initialMultiplierValue = 40;
    if (rightAnswersStreak.current >= 12) initialMultiplierValue = 80;

    multiplierValue.current = initialMultiplierValue;

    setScoreMultiplier(multiplierValue.current);
  };

  const setScoreValue = useCallback(() => {
    setMultiplierValue();
    setScore(score + multiplierValue.current);
  }, [score]);

  const setPairOfWords = useCallback(() => {
    wordIndex.current++;
    const translationWordIndicator = Math.random() > 0.5;
    const newWordTranslation = !translationWordIndicator
      ? props.words[getRandomIndex(props.words)]
      : props.words[wordIndex.current];

    if (!newWordTranslation) return;

    setCardInner({
      word: props.words[wordIndex.current],
      translation: newWordTranslation,
    })
  }, [props.words]);

  const updateGameStatus = useCallback(() => {
    if (wordsInGame.current.length >= props.words.length) {
      props.setLastGameResults(wordsInGame.current);
      props.setIsResultsVisible(true);
      props.closeGame('');
    } else {
      setScoreValue();
      setPairOfWords();
    }
  }, [setPairOfWords, setScoreValue, props]);

  const handleAnswerButtonClick = useCallback((isRightButton: boolean) => {
    if (!cardInner?.word) return;

    const answerStatus = isRightButton
      ? cardInner.word.wordTranslate === cardInner.translation.wordTranslate
      : cardInner.word.wordTranslate !== cardInner.translation.wordTranslate;

    const newWord = { word: cardInner.word, isCorrect: answerStatus };
    wordsInGame.current.push(newWord);

    if (answerStatus) {
      !isMuted && onSuccess();
      rightAnswersStreak.current++;
    } else {
      !isMuted && onFailure();
      rightAnswersStreak.current = 0;
    }

    updateGameStatus();
  }, [cardInner, onFailure, onSuccess, isMuted, updateGameStatus]);

  useEffect(() => {
    if (!seconds) {
      props.setLastGameResults(wordsInGame.current);
      props.setIsResultsVisible(true);
      props.closeGame('');
    }
  }, [props, seconds]);

  useEffect(() => {
    isMuted
      ? localStorage.setItem('isMuted', 'true')
      : localStorage.removeItem('isMuted');
  }, [isMuted]);

  useEffect(() => {
    const translationIndex = getRandomIndex(props.words);

    setCardInner({
      word: props.words[wordIndex.current],
      translation: props.words[translationIndex],
    });
  }, [props.words]);

  useEffect(() => {
    let timerValue = 60;
    let myInterval = setInterval(() => {
      if (timerValue > 0) {
        timerValue--;
        setSeconds(timerValue);
      } else {
        clearInterval(myInterval);
      }
    }, 1000);

    return () => clearInterval(myInterval);
  }, []);

  useEffect(() => {
    const addStyles = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') {
        setIsWrongButtonLightned(true);
      }

      if (e.code === 'ArrowRight') {
        setIsRightButtonLightned(true);
      }
    };

    document.addEventListener('keydown', addStyles);
    return () => document.removeEventListener('keydown', addStyles);
  }, []);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') {
        setIsWrongButtonLightned(false);
        handleAnswerButtonClick(false);
      }

      if (e.code === 'ArrowRight') {
        setIsRightButtonLightned(false);
        handleAnswerButtonClick(true);
      }
    };

    document.addEventListener('keyup', listener);
    return () => document.removeEventListener('keyup', listener);
  }, [handleAnswerButtonClick]);

  return (
    <FullScreen handle={handle}>
      <div className={styles['container']}>
        <GameSettings
          handle={handle}
          handleFullScreenButtonClick={handleFullScreenButtonClick}
          closeGame={props.closeGame}
          changeSoundState={changeSoundState}
          isMuted={isMuted}
        />
        <div className={styles['game-board']}>
          <div className={styles['game-statistics']}>
            <div className={styles['timer']}>
              <div className={styles['timer-bg']}></div>
              <div className={styles['timer-item']}>{`${seconds}`}</div>
            </div>
            <div className={styles['score']}>
              <div className={styles['score-counter']}>{score}</div>
              <div className={styles['score-multiplier']}>+{scoreMultiplier}</div>
            </div>
          </div>
          <div className={styles['game-field']}>
            <AnswersIndicator streak={rightAnswersStreak.current} />
            <div className={styles['word']}>
              {cardInner?.word.word}
            </div>
            <div className={styles['word-translation']}>
              {cardInner?.translation.wordTranslate}
            </div>
            <div className={styles['control-btns-container']}>
              <button
                className={isWrongButtonLightned
                  ? styles['wrong-answer-btn-active']
                  : styles['wrong-answer-btn']}
                type="button"
                onClick={() => handleAnswerButtonClick(false)}
              >
                Неверно
              </button>
              <button
                className={isRightButtonLightned
                  ? styles['right-answer-btn-active']
                  : styles['right-answer-btn']}
                type="button"
                onClick={() => handleAnswerButtonClick(true)}
              >
                Верно
              </button>
            </div>
          </div>
        </div>
      </div>
    </FullScreen>
  );
};

export default SprintGame;
