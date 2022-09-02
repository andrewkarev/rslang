import React, { useContext, useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import MainPage from './components/main-page/MainPage';
import Textbook from './components/textbook/Textbook';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import AuthorisationForm from './components/header/authorisation/AuthorisationForm';
import GamesPage from './components/games-page/GamesPage';
import { AuthorisationContext } from './context/AuthorisationContext';

function App() {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { isAuthorised, changeAuthorisationStatus } = useContext(AuthorisationContext);

  useEffect(() => {
    if (localStorage.getItem('id') && !isAuthorised) {
      changeAuthorisationStatus();
    }
  }, [changeAuthorisationStatus, isAuthorised]);

  const toggleModalVisability = () => {
    setIsModalOpened(!isModalOpened);
  };

  return (
    <>
      <Header toggleModalVisability={toggleModalVisability} />
      {isModalOpened && <AuthorisationForm toggleModalVisability={toggleModalVisability} />}

      <Routes>
        <Route path="/" element={
          <>
            <MainPage />
            {/* <Footer /> */}
          </>
        } />
        <Route path="textbook" element={<Textbook />} />
        <Route path="games" element={<GamesPage />} />
        {/* <Route path="statistics" element={< />} /> */}
      </Routes>
    </>
  );
}

export default App;
