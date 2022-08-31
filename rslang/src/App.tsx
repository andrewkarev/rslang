import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import MainPage from './components/main-page/MainPage';
import Textbook from './components/textbook/Textbook';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import AuthorisationForm from './components/header/authorisation/AuthorisationForm';
import GamesPage from './components/games-page/GamesPage';

function App() {
  const [isModalOpened, setIsModalOpened] = useState(false);

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
