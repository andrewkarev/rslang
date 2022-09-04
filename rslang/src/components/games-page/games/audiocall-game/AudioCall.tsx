import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import getRandomIndex from '../../../../services/get-random-index';
import IWord from '../../../../types/services-interfaces/IWord';
import GameSettings from '../game-settings/GameSettings';
import styles from './audio-call.module.css';
import successSound from '../../../../assets/sounds/sound-of-success.ogg';
import failureSound from '../../../../assets/sounds/sound-of-failure.ogg';
import useSound from 'use-sound';
import shuffle from '../../../../services/shuffle';
import updateUsersWords from '../../../../services/update-user-words';
import { AuthorisationContext } from '../../../../context/AuthorisationContext';
import OptionButton from './option-button/OptionButton';

interface AudioCallGameProps {
  words: IWord[],
  choosenGame: string,
  audioCallNewWords: React.MutableRefObject<number>,
  audioCallLearnedWords: React.MutableRefObject<number>,
  closeGame: (choice: string) => void,
  setLastGameResults: (value: React.SetStateAction<[] | {
    word: IWord;
    isCorrect: boolean;
  }[]>) => void,
  setIsResultsVisible: (value: React.SetStateAction<boolean>) => void,
  longestSreak: React.MutableRefObject<{
    best: number;
    current: number;
  }>,
}

const AudioCallGame: React.FC<AudioCallGameProps> = (props) => {
  const { isAuthorised } = useContext(AuthorisationContext);

  const BASE_URL = 'https://rslangappteam102.herokuapp.com';

  const gameWords = useRef(shuffle(props.words));

  const handle = useFullScreenHandle();
  const handleFullScreenButtonClick = () => {
    handle.active ? handle.exit() : handle.enter();
  };

  const [isMuted, setIsMuted] = useState(true);

  const changeSoundState = () => {
    setIsMuted(true);
  };

  const [onSuccess] = useSound(successSound);
  const [onFailure] = useSound(failureSound);

  const wordsInGame = useRef<{ word: IWord, isCorrect: boolean }[]>([]);

  const wordIndex = useRef(0);

  const [imageUrl, setImageUrl] = useState<string>();
  const [audio] = useState(new Audio());

  const [currentWord, setCurrentWord] = useState<IWord>();
  const [translations, setTranslations] = useState<string[]>([]);
  const [alternativeMode, setAlternativeMode] = useState(true);

  const [answersGiven, setAnswersGiven] = useState(0);

  const canGiveAnswer = useRef(false);

  const [isOptionLightned, setIsOptionLightned] = useState<('base' | 'right' | 'wrong')[]>([])

  useEffect(() => {
    setCurrentWord(gameWords.current[wordIndex.current]);
    canGiveAnswer.current = true;
  }, []);

  useEffect(() => {
    setImageUrl(`${BASE_URL}/${currentWord?.image}`);
  }, [currentWord?.image]);

  useEffect(() => {
    if (answersGiven >= 10) return;

    audio.src = `${BASE_URL}/${currentWord?.audio}`;

    const canPlay = () => {
      audio.play();
      audio.removeEventListener('canplay', canPlay);
    }

    audio.addEventListener('canplay', canPlay);
  }, [audio, currentWord?.audio, answersGiven]);

  const getWordsTranslation = useCallback(() => {
    const ANSWERS_OPTIONS = 5;
    const relevantAnswerOption = gameWords.current.length >= ANSWERS_OPTIONS
      ? ANSWERS_OPTIONS
      : gameWords.current.length;
    const wordsList: string[] = [];
    const correctAnswer = currentWord?.wordTranslate;

    if (!correctAnswer) return;

    wordsList.push(correctAnswer);

    while (wordsList.length < relevantAnswerOption) {
      const wordIndex = getRandomIndex(gameWords.current);
      const newTranslation = gameWords.current[wordIndex].wordTranslate;

      if (wordsList.includes(newTranslation)) {
        continue;
      }

      wordsList.push(newTranslation);
    }

    return wordsList.sort(() => Math.random() - 0.5);
  }, [currentWord?.wordTranslate]);

  useEffect(() => {
    const translation = getWordsTranslation();

    if (!translation) return;

    setTranslations(translation);
  }, [getWordsTranslation]);

  const playAudio = () => {
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }

    audio.play();
  };

  const updateGameWordStatus = useCallback(async (newWord: {
    word: IWord;
    isCorrect: boolean;
  }) => {
    if (isAuthorised) {
      const response = await updateUsersWords('Аудио-вызов', newWord);

      if (!response) return;

      const [isNewWord, isLearnedWord] = response;

      if (isNewWord) props.audioCallNewWords.current++;
      if (isLearnedWord) props.audioCallLearnedWords.current++;
    }
  }, [isAuthorised, props.audioCallNewWords, props.audioCallLearnedWords]);

  const updateStreak = useCallback((isAnswerCorrect: boolean) => {
    const streak = props.longestSreak.current;

    if (isAnswerCorrect) {
      streak.current++;
    } else {
      props.longestSreak.current.best = Math.max(streak.best, streak.current);
      streak.current = 0;
    }
  }, [props.longestSreak]);

  const handleOptionButtonEvent = useCallback((optionIndex: number) => {
    if (!canGiveAnswer.current || !currentWord) return;
    const currentWordTranslation = currentWord?.wordTranslate || '';
    const currentwordIndex = translations.indexOf(currentWordTranslation);
    const optionLightning: ('base' | 'right' | 'wrong')[] = new Array(5).fill('base');
    const isRight = optionIndex === currentwordIndex;

    const newWord = { word: currentWord, isCorrect: isRight };
    wordsInGame.current.push(newWord);

    if (isRight) {
      optionLightning[optionIndex] = 'right';
      onSuccess();
      updateStreak(true);
    } else {
      optionLightning[optionIndex] = 'wrong';
      optionLightning[currentwordIndex] = 'right';
      onFailure();
      updateStreak(false);
    }

    canGiveAnswer.current = false;

    setIsOptionLightned(optionLightning);
    setAlternativeMode(false);
    updateGameWordStatus(newWord);
  }, [currentWord, translations, onFailure, onSuccess, updateGameWordStatus, updateStreak]);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code.match(/(Digit+(1|2|3|4|5))/)) {
        e.preventDefault();
        const correction = 1;
        const index = Number(e.code.slice(-1)) - correction;
        handleOptionButtonEvent(index);
      }
    };

    document.addEventListener('keyup', listener);
    return () => document.removeEventListener('keyup', listener);
  }, [handleOptionButtonEvent]);

  const handleNextButtonEvent = useCallback(() => {
    if (!currentWord) return;

    const optionLightning: ('base' | 'right' | 'wrong')[] = new Array(5).fill('base');

    if (!alternativeMode) {
      wordIndex.current++;
      setCurrentWord(gameWords.current[wordIndex.current]);
      const nextWordsOptions = getWordsTranslation();

      if (!nextWordsOptions) return;

      setTranslations(nextWordsOptions);
      canGiveAnswer.current = true;
    } else {
      const currentWordTranslation = currentWord?.wordTranslate || '';
      const currentWordIndex = translations.indexOf(currentWordTranslation);

      const newWord = { word: currentWord, isCorrect: false };
      wordsInGame.current.push(newWord);

      optionLightning[currentWordIndex] = 'right';

      updateGameWordStatus(newWord);
      updateStreak(false);
    }

    setAnswersGiven(wordIndex.current);
    setIsOptionLightned(optionLightning);
    setAlternativeMode(!alternativeMode);
  }, [alternativeMode, currentWord, translations, getWordsTranslation, updateGameWordStatus, updateStreak]);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleNextButtonEvent();
      }
    };

    document.addEventListener('keyup', listener);
    return () => document.removeEventListener('keyup', listener);
  }, [handleNextButtonEvent]);

  useEffect(() => {
    if (answersGiven >= 10 || answersGiven >= gameWords.current.length) {
      props.setLastGameResults(wordsInGame.current);
      props.setIsResultsVisible(true);
    }
  }, [props, answersGiven]);

  const options = translations.map((translation, index) => {
    return (
      <OptionButton
        isOptionLightned={isOptionLightned}
        handleOptionButtonEvent={handleOptionButtonEvent}
        translation={translation}
        index={index}
        key={translation}
      />
    );
  });

  return (
    <FullScreen handle={handle}>
      <div className={styles['container']}>
        <GameSettings
          handle={handle}
          handleFullScreenButtonClick={handleFullScreenButtonClick}
          closeGame={props.closeGame}
          changeSoundState={changeSoundState}
          isMuted={isMuted}
          choosenGame={props.choosenGame}
        />
        <div className={styles['game-board']}>
          <div className={styles['game-field']}>
            <div className={styles['game-info']}>
              {!alternativeMode &&
                <img
                  className={styles['image']}
                  src={imageUrl}
                  alt={currentWord?.word} />}
              <div className={styles['word-components']}>
                <div
                  className={styles[`${alternativeMode
                    ? 'play-btn-wrapper-alternative'
                    : 'play-btn-wrapper'}`]}
                  onClick={playAudio}>
                  <div className={styles['play-btn-container']}>
                    <button
                      className={styles[`${alternativeMode
                        ? 'play-btn-alternative'
                        : 'play-btn'}`]}
                      type="button"
                    >
                    </button>
                  </div>
                </div>
                {!alternativeMode &&
                  <div className={styles['word']}>
                    {currentWord?.word}
                  </div>}
              </div>
            </div>
            <div className={styles['options-btns-container']}>
              {options}
            </div>
            <button
              className={styles['next-btn']}
              type="button"
              onClick={handleNextButtonEvent}
            >
              {alternativeMode
                ? 'Не знаю'
                : 'Далее'}
            </button>
          </div>
        </div>
      </div>
    </FullScreen>
  );
};

export default AudioCallGame;