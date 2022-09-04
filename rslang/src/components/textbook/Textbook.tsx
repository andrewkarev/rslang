import React, { useContext, useEffect, useRef, useState } from 'react';
import Levels from './levels/Levels';
import TextbookCards from './textbook-cards/TextbookCards';
import SelectedCard from './selected-card/SelectedCard';
import Pagination from './pagination/Pagination';
import Games from './games/Games';
import styles from './textbook.module.css';
import IWord from '../../types/services-interfaces/IWord';
import { learnWordAPI } from '../..';
import { AuthorisationContext } from '../../context/AuthorisationContext';
import IUserWord from '../../types/services-interfaces/IUserWord';
import SprintGame from '../games-page/games/sprint-game/SprintGame';
import AudioCallGame from '../games-page/games/audiocall-game/AudioCall';
import GameResults from '../games-page/games/game-results/GameResults';

type TextbookProps = {
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

const Textbook: React.FC<TextbookProps> = ({
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
  const { isAuthorised } = useContext(AuthorisationContext);

  const userId = isAuthorised && localStorage.getItem('id');

  const initialLevel = Number(localStorage.getItem('level')) || 0;
  const initialCard = Number(localStorage.getItem('card')) || 0;
  const initialPage = Number(localStorage.getItem('page')) || 0;

  const [currentStatus, setCurrentStatus] = useState({
    currentLevel: initialLevel,
    currentCard: initialCard,
    currentPage: initialPage
  });
  const [currentLevelWords, setCurrentLevelWords] = useState<IWord[] | []>([]);
  const [currentUserWords, setCurrentUserWords] = useState<IUserWord[] | []>([]);
  const [currentUserWord, setCurrentUserWord] = useState<IUserWord | undefined>();
  const [complicatedWordsAmount, changeComplicatedWordsAmount] = useState(0);
  const [isLearnedPage, setLearnedPage] = useState(false);

  const [audioPlayer] = useState(new Audio());

  const currentUserWordsStorage = useRef<IUserWord[] | []>([]);

  useEffect(() => {

    const asyncFunction = async () => {
      if (isAuthorised && userId && initialLevel < 6) {
        const data = await learnWordAPI.getUserWords(userId);

        if (data) {
          setCurrentUserWords(data);
          currentUserWordsStorage.current = data;
        }
      }

      const data = await learnWordAPI.getWords(initialLevel, initialPage);
      if (data) {
        setCurrentLevelWords(data);
      }
    }
    asyncFunction();
  }, [initialLevel, initialPage, isAuthorised, userId]);

  useEffect(() => {
    if (choosenGame && isResultsVisible) return

    const asyncFunction = async () => {

      let levelWords: IWord[] | void;

      if (isAuthorised && userId && currentStatus.currentLevel === 6) {

        const complicatedUserWords: Promise<IWord | void>[] = [];
        const complicatedWords = currentUserWordsStorage.current.filter((userWord) => userWord.optional.isDifficult);

        for (let userWord of complicatedWords) {
          complicatedUserWords.push(learnWordAPI.getWord(userWord.wordId!));
        }

        const results = await Promise.all(complicatedUserWords);

        let words: IWord[] = [];
        for (let word of results) {
          if (word) words.push(word);
        }

        setCurrentLevelWords(words);

      } else {

        levelWords = await learnWordAPI.getWords(currentStatus.currentLevel, currentStatus.currentPage);

        if (levelWords) {
          setCurrentLevelWords(levelWords);
        }
      }

      if (isAuthorised && userId) {

        const userData = await learnWordAPI.getUserWords(userId);
        if (userData) {
          setCurrentUserWords(userData);
          changeComplicatedWordsAmount(userData.filter((userWord) => userWord.optional.isDifficult).length);

          if (levelWords && currentStatus.currentLevel < 6) {
            const pageUserData = levelWords.filter((item) =>
              userData.find((userItem) =>
                userItem.wordId === item.id && (userItem.optional.isDifficult || userItem.optional.isLearned))
            )

            if (pageUserData.length === 20) {
              setLearnedPage(true);
            } else {
              setLearnedPage(false);
            }
          }
        }
      }
    }

    asyncFunction();
    audioPlayer.pause();
  }, [isAuthorised, currentStatus, audioPlayer, currentUserWord, complicatedWordsAmount, userId, choosenGame, isResultsVisible]);

  return (
    <>
      {!choosenGame && !isResultsVisible && <div className={styles['textbook']}>
        <div className={styles['wrapper'] + ' textbook-wrapper'}>
          <h2 className={styles['title']}>Учебник</h2>
          <Levels
            currentStatus={currentStatus}
            complicatedWordsAmount={complicatedWordsAmount}
            setCurrentStatus={setCurrentStatus}
          />
          <div className={`book-wrapper level-group-${currentStatus.currentLevel}`}>
            <h2 className={styles['title']}>
              Слова
            </h2>
            <div className={`${styles['book-page-wrapper']} ${isLearnedPage && currentStatus.currentLevel !== 6 ? 'learned' : ''}`}>

              <p className={styles['learned-message']}>* все слова на данной странице изучены</p>
              <TextbookCards
                words={currentLevelWords}
                currentUserWords={currentUserWords}
                currentStatus={currentStatus}
                setCurrentStatus={setCurrentStatus}
              />
              {
                (currentStatus.currentLevel < 6 || (currentStatus.currentLevel === 6 && currentLevelWords.length > 0)) &&
                <SelectedCard
                  currentWord={currentLevelWords[currentStatus.currentCard]}
                  userWord={
                    (isAuthorised && currentLevelWords.length > 0)
                      ? currentStatus.currentLevel < 7
                        ? currentUserWords.find((word) => word.wordId === currentLevelWords[currentStatus.currentCard].id)
                        : undefined
                      : undefined
                  }
                  currentStatus={currentStatus}
                  audioPlayer={audioPlayer}
                  setCurrentUserWord={setCurrentUserWord}
                  setCurrentStatus={setCurrentStatus}
                />
              }

            </div>
            {
              currentStatus.currentLevel !== 6 &&
              <Pagination
                currentStatus={currentStatus}
                isLearnedPage={isLearnedPage}
                setCurrentStatus={setCurrentStatus}
              />
            }

          </div>
          <Games
            isLearnedPage={isLearnedPage}
            currentLevelWords={currentLevelWords}
            currentUserWords={currentUserWords}
            currentStatus={currentStatus}
            handleGameChoice={handleGameChoice}
            words={words}
          />
        </div>
      </div>}
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

export default Textbook;
