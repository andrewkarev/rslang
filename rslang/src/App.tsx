import React, { useContext, useEffect, useRef, useState } from 'react';
import './App.css';
import MainPage from './components/main-page/MainPage';
import Textbook from './components/textbook/Textbook';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import AuthorisationForm from './components/header/authorisation/AuthorisationForm';
import GamesPage from './components/games-page/GamesPage';
import { AuthorisationContext } from './context/AuthorisationContext';
import StatisticsPage from './components/statistics-page/StatisticsPage';
import Footer from './components/footer/Footer'
import IWord from './types/services-interfaces/IWord';
import { AuthorisationError } from './types/errors/RequestError';
import { learnWordAPI } from '.';

function App() {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { isAuthorised, changeAuthorisationStatus } = useContext(AuthorisationContext);

  const [choosenGame, setChoosenGame] = useState('');

  const handleGameChoice = (choice: string) => {
    setChoosenGame(choice);
  }

  const [isResultsVisible, setIsResultsVisible] = useState(false);

  const words = useRef<IWord[] | []>([]);

  const sprintlongestSreak = useRef<{ best: number, current: number }>({
    best: 0,
    current: 0,
  });

  const sprintNewWords = useRef(0);
  const sprintLearnedWords = useRef(0);

  const audioCallLongestSreak = useRef<{ best: number, current: number }>({
    best: 0,
    current: 0,
  });

  const audioCallNewWords = useRef(0);
  const audioCallLearnedWords = useRef(0);

  const [lastGameResults, setLastGameResults] = useState<{
    word: IWord, isCorrect: boolean
  }[] | []>([]);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const userId = localStorage.getItem('id');

        if (userId && !isAuthorised) {
          await learnWordAPI.getUserWords(userId);
          changeAuthorisationStatus();
        }
      } catch (error) {
        if (error instanceof AuthorisationError && isAuthorised) {
          localStorage.clear();
          changeAuthorisationStatus();
        }
      }
    }

    checkUserStatus();
  }, [changeAuthorisationStatus, isAuthorised]);

  const toggleModalVisability = () => {
    const body = document.querySelector('body');

    if (!body) return;

    if (!isModalOpened) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }

    setIsModalOpened(!isModalOpened);
  };

  return (
    <>
      <Header toggleModalVisability={toggleModalVisability} />
      {isModalOpened && <AuthorisationForm toggleModalVisability={toggleModalVisability} />}

      <Routes>
        <Route path="/" element={<MainPage
          toggleModalVisability={toggleModalVisability} />
        } />
        <Route path="textbook" element={<Textbook
          choosenGame={choosenGame}
          isResultsVisible={isResultsVisible}
          words={words}
          handleGameChoice={handleGameChoice}
          setIsResultsVisible={setIsResultsVisible}
          sprintlongestSreak={sprintlongestSreak}
          sprintNewWords={sprintNewWords}
          sprintLearnedWords={sprintLearnedWords}
          setLastGameResults={setLastGameResults}
          audioCallLongestSreak={audioCallLongestSreak}
          audioCallNewWords={audioCallNewWords}
          audioCallLearnedWords={audioCallLearnedWords}
          lastGameResults={lastGameResults}
        />} />
        <Route path="games" element={<GamesPage
          choosenGame={choosenGame}
          isResultsVisible={isResultsVisible}
          handleGameChoice={handleGameChoice}
          setIsResultsVisible={setIsResultsVisible}
          words={words}
          sprintlongestSreak={sprintlongestSreak}
          sprintNewWords={sprintNewWords}
          sprintLearnedWords={sprintLearnedWords}
          audioCallLongestSreak={audioCallLongestSreak}
          audioCallNewWords={audioCallNewWords}
          audioCallLearnedWords={audioCallLearnedWords}
          lastGameResults={lastGameResults}
          setLastGameResults={setLastGameResults}
        />} />
        <Route path="statistics" element={<StatisticsPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
