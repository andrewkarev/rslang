import React, { useContext, useEffect, useState } from 'react';
import Levels from './levels/Levels';
import TextbookCards from './textbook-cards/TextbookCards';
import SelectedCard from './selected-card/SelectedCard';
import Pagination from './pagination/Pagination';
import Games from './games/Games';
import styles from './textbook.module.css';
import IWord from '../../types/services-interfaces/IWord';
import {learnWordAPI} from '../..';
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

  useEffect(() => {
    
    const asyncFunction = async () => {
      if (isAuthorised && userId && initialLevel < 6) {
        const data = await learnWordAPI.getUserWords(userId);

        if (data) {
          setCurrentUserWords(data);
        }
      }
      
      const data = await learnWordAPI.getWords(initialLevel, initialPage);
      if (data) {
        setCurrentLevelWords(data);
      } 
    }
    asyncFunction();   
  }, []);

  useEffect(() => {
    const asyncFunction = async () => {
      
      let levelWords: IWord[] | void;
      
      if (isAuthorised && userId && currentStatus.currentLevel === 6) {
              
        const complicatedUserWords: IWord[] = [];
        const complicatedWords = currentUserWords.filter((userWord) => userWord.optional.isDifficult)
        for (let userWord of complicatedWords) {
          const word = await learnWordAPI.getWord(userWord.wordId!);
          
          if (word) {
            complicatedUserWords.push(word);
          }
        }
        
        setCurrentLevelWords(complicatedUserWords);
  
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
            console.log(pageUserData);
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
  }, [isAuthorised, currentStatus, audioPlayer, currentUserWord, complicatedWordsAmount]);

  return (
    <>
      <div className={ styles['textbook'] }>
        <div className={ styles['wrapper'] + ' textbook-wrapper' }>
          <h2 className={ styles['title'] }>Учебник</h2>
          <Levels 
            currentStatus={ currentStatus }            
            complicatedWordsAmount={ complicatedWordsAmount }
            setCurrentStatus={ setCurrentStatus }
          />
          <div className={ `book-wrapper level-group-${currentStatus.currentLevel}` }>
            <h2 className={ styles['title'] }>
              Слова
            </h2>
            <div className={ `${styles['book-page-wrapper']}  ${isLearnedPage ? 'learned' : ''}` }>
              
              <p className={ styles['learned-message'] }>* все слова на данной странице изучены</p>
              <TextbookCards 
                words={ currentLevelWords } 
                currentUserWords={ currentUserWords }
                currentStatus={ currentStatus }
                setCurrentStatus={ setCurrentStatus }
              />
              { 
                (currentStatus.currentLevel < 6 || (currentStatus.currentLevel === 6 && currentLevelWords.length > 0)) &&
                  <SelectedCard 
                    currentWord={ currentLevelWords[currentStatus.currentCard] } 
                    userWord={ 
                      (isAuthorised && currentLevelWords.length > 0)
                        ? currentStatus.currentLevel < 7
                          ? currentUserWords.find((word) => word.wordId === currentLevelWords[currentStatus.currentCard].id) 
                          : undefined 
                        : undefined
                    }
                    currentStatus={ currentStatus }
                    audioPlayer={ audioPlayer }
                    setCurrentUserWord={ setCurrentUserWord }
                  />
              }
              
            </div>
            {
              currentStatus.currentLevel !== 6 &&
              <Pagination
                currentStatus={ currentStatus }
                isLearnedPage={isLearnedPage}
                setCurrentStatus={ setCurrentStatus }
              />
            }
            
          </div>
          <Games 
            isLearnedPage={ isLearnedPage }
          />
        </div>
      </div>
    </>
  );
}

export default Textbook;
