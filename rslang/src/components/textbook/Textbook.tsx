import React, { useEffect, useState } from 'react';
import Levels from './levels/Levels';
import TextbookCards from './textbook-cards/TextbookCards';
import SelectedCard from './selected-card/SelectedCard';
import Pagination from './pagination/Pagination';
import Games from './games/Games';
import styles from './textbook.module.css';
import IWord from '../../types/services-interfaces/IWord';
import apiService from '../..';


const Textbook = () => {
  const initialLevel = Number(localStorage.getItem('level')) || 0;
  const initialCard = Number(localStorage.getItem('card')) || 0;
  const initialPage = Number(localStorage.getItem('card')) || 0;
  
  const [currentLevel, changeLevel] = useState(initialLevel);
  const [currentCard, setCurrentCard] = useState(initialCard);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const getWords = async (level: number, page: number) => {
    try {
      const data = await apiService.getWords(level, page);

      if (data) {
        setCurrentLevelWords(data);
      }
    } catch (error) {
      if (!(error instanceof Error)) return;
      console.warn(error.message);
    }
  }

  useEffect(() => {
    const asyncFunction = async () => {
      await getWords(currentLevel, 0);
    }
    asyncFunction();    
  }, []);
  
  useEffect(() => {
    const asyncFunction = async () => {
      await getWords(currentLevel, currentPage);
    }
    asyncFunction();   

    setCurrentCard(0);
  }, [currentPage]); 

  const [currentLevelWords, setCurrentLevelWords] = useState<IWord[] | []>([]);

  return (
    <>
      <div className={ styles['textbook'] }>
        <div className={ styles['wrapper'] + ' textbook-wrapper' }>
          <h2 className={ styles['title'] }>Учебник</h2>
          <Levels 
            currentLevel={ currentLevel } 
            changeLevel={ changeLevel }
            getWords={ getWords }
          />
          <div className={ `book-wrapper level-group-${currentLevel}` }>
            <h2 className={ styles['title'] }>Слова</h2>
            <div className={ styles['book-page-wrapper'] }>
              <TextbookCards words={ currentLevelWords } setCurrentCard={ setCurrentCard }/>
              <SelectedCard currentWord={ currentLevelWords[currentCard] } />
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={ setCurrentPage }/>
          </div>
          <Games />
        </div>
      </div>
    </>
  );
}

export default Textbook;
