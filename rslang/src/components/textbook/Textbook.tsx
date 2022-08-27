import React, { useContext, useEffect, useState } from 'react';
import Levels from './levels/Levels';
import TextbookCards from './textbook-cards/TextbookCards';
import SelectedCard from './selected-card/SelectedCard';
import Pagination from './pagination/Pagination';
import Games from './games/Games';
import styles from './textbook.module.css';
import IWord from '../../types/services-interfaces/IWord';
import {learWordAPI} from '../..';
import { AuthorisationContext } from '../../context/AuthorisationContext';
import IUserWord from '../../types/services-interfaces/IUserWord';

const Textbook = () => {
  const { isAuthorised } = useContext(AuthorisationContext);
  const userId = isAuthorised 
    ? localStorage.getItem('id') || null 
    : null;

  const initialLevel = Number(localStorage.getItem('level')) || 0;
  const initialCard = Number(localStorage.getItem('card')) || 0;
  const initialPage = Number(localStorage.getItem('page')) || 0;
  
  const [currentLevel, setCurrentLevel] = useState(initialLevel);
  const [currentCard, setCurrentCard] = useState(initialCard);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentLevelWords, setCurrentLevelWords] = useState<IWord[] | []>([]);
  const [currentUserWords, setCurrentUserWords] = useState<IUserWord[] | []>([]);
  const [currentUserWord, setCurrentUserWord] = useState<IUserWord | undefined>();
  //const [wordStatus, setWordStatus] = useState<{isComplicated: boolean, isLearned: boolean}>();

  const getWords = async (level: number, page: number) => {
    const data = await learWordAPI.getWords(level, page);

    if (data) {
      setCurrentLevelWords(data);
    }
  }

  const getUserWords = async (userId: string) => {
    if (!userId) return;
    const data = await learWordAPI.getUserWords(userId);

    if (data) {
      setCurrentUserWords(data);
      
      const userWord = data.find((word) => word.wordId === currentLevelWords[currentCard].id);
      if (userWord) {
        setCurrentUserWord(userWord);
        const initialComplecatedValue = (userWord.wordId === currentLevelWords[currentCard].id) 
          && userWord.optional.isDifficult;
        
        const initialLearnedValue = (userWord.wordId === currentLevelWords[currentCard].id) 
          && userWord.optional.isLearned;

        //setWordStatus({ isComplicated: initialComplecatedValue, isLearned: initialLearnedValue });
      } else {
        setCurrentUserWord(undefined);
        console.log('no status')
      }
    }   
  }

  const asyncFunction = async () => {
    if (isAuthorised && userId) {
      await getUserWords(userId);
    }
    
    await getWords(currentLevel, currentPage);    
  }

  const [audioPlayer] = useState(new Audio());

  useEffect(() => {
    asyncFunction();    
  }, []);

  useEffect(() => {
    asyncFunction();    
  }, [isAuthorised]);

  useEffect(() => {
    asyncFunction();    
    audioPlayer.pause();
  }, [currentLevel, currentPage, currentCard, currentUserWord, audioPlayer]);


  // useEffect(() => {
  //   audioPlayer.pause();
  // }, [currentCard]);

  return (
    <>
      <div className={ styles['textbook'] }>
        <div className={ styles['wrapper'] + ' textbook-wrapper' }>
          <h2 className={ styles['title'] }>Учебник</h2>
          <Levels 
            currentLevel={ currentLevel } 
            setCurrentLevel={ setCurrentLevel }
            setCurrentCard={ setCurrentCard }
            setCurrentPage={ setCurrentPage }
          />
          <div className={ `book-wrapper level-group-${currentLevel}` }>
            <h2 className={ styles['title'] }>Слова</h2>
            <div className={ styles['book-page-wrapper'] }>
              <TextbookCards 
                words={ currentLevelWords } 
                currentUserWords={ currentUserWords }
                currentCard={ currentCard } 
                setCurrentCard={ setCurrentCard }
              />
              <SelectedCard 
                currentWord={ currentLevelWords[currentCard] } 
                // userWord={ 
                //   isAuthorised 
                //     ? currentUserWords.find((word) => word.wordId === currentLevelWords[currentCard].id)
                //     : undefined
                // }
                userWord={ isAuthorised ? currentUserWord : undefined }
                
                audioPlayer={ audioPlayer }
                setCurrentUserWord={ setCurrentUserWord }
                //setWordStatus={ setWordStatus }
              />
            </div>
            <Pagination 
              currentPage={currentPage} 
              setCurrentCard={ setCurrentCard }
              setCurrentPage={ setCurrentPage }
            />
          </div>
          <Games />
        </div>
      </div>
    </>
  );
}

export default Textbook;
