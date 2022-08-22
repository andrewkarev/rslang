import React from 'react';
// import logo from './logo.svg';
import './App.css';
import MainPage from './components/main-page/MainPage';
import Textbook from './components/textbook/Textbook';
import { Route, Routes } from 'react-router-dom';
import GamesPage from './components/games-page/GamesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="textbook" element={<Textbook />} />
      <Route path="games" element={<GamesPage />} />
    </Routes>
  );
}

export default App;
