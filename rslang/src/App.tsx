import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import MainPage from './components/main-page/MainPage';
import Textbook from './components/textbook/Textbook';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import AuthorisationForm from './components/header/authorisation/AuthorisationForm';

function App() {
  //temporary state
  const [isModalOpened, setIsModalOpened] = useState(false);

  const toggleModalVisability = () => {
    setIsModalOpened(!isModalOpened);
  };

  return (
    <>
      <Header toggleModalVisability={toggleModalVisability} />
      <Routes>
        <Route path="/" element={
          <>
            <MainPage />
            {/* <Footer /> */}
          </>
        } />
        <Route path="textbook" element={<Textbook />} />
      </Routes>
      {isModalOpened && <AuthorisationForm toggleModalVisability={toggleModalVisability} />}
    </>
  );
}

export default App;
