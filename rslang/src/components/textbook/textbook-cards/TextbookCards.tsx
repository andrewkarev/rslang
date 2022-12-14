import React, { MouseEvent, useContext, useState } from 'react';
import { AuthorisationContext } from '../../../context/AuthorisationContext';
import IUserWord from '../../../types/services-interfaces/IUserWord';
import IWord from '../../../types/services-interfaces/IWord';
import styles from './textbook-cards.module.css';

type Props = {
  words: IWord[];
  currentUserWords: IUserWord[];
  currentStatus: {currentLevel: number, currentCard: number, currentPage: number};
  setCurrentStatus: (status: {currentLevel: number, currentCard: number, currentPage: number}) => void;
}

const TextbookCards: React.FC<Props> = ({ words, currentUserWords, currentStatus, setCurrentStatus }) => {
  const cardsData = new Array(words.length).fill({ word: '', translation: '' });
  
  const { isAuthorised } = useContext(AuthorisationContext);

  const handlerCardClick = (card: number, event: MouseEvent) => {
    setCurrentStatus({...currentStatus, currentCard: card });

    localStorage.setItem('card', `${card}`);
  }

  const checkOnComplicated = (wordId: string) => {
    if (currentUserWords) {
      const isUserWordComplicated = 
        currentUserWords.find((word) => word.wordId === wordId && word.optional.isDifficult);
        return isUserWordComplicated;
    }
    return false;
  }

  const checkOnLearned = (wordId: string) => {
    if (currentUserWords) {
      const isUserWordComplicated = 
        currentUserWords.find((word) => word.wordId === wordId && word.optional.isLearned);
        return isUserWordComplicated;
    }
    return false;
  }

  const cardsElements = cardsData.map((card, index) => {
    return (
      <div 
        className={ `${styles['card']} ${index === currentStatus.currentCard ? styles['active'] : ''}` } 
        onClick={ handlerCardClick.bind(null, index) }
        key={ index + 'card' }
      >
        <h3 className={ styles['word'] }>
          { words[index].word }
        </h3> 
        <p className={ styles['translation'] }>
          { words[index].wordTranslate }
        </p>
        <div className={ styles['status'] }>
          { isAuthorised && checkOnComplicated(words[index].id) ? '??????????????' : ''}
          { isAuthorised && checkOnLearned(words[index].id) ? '??????????????' : ''}
        </div>
      </div>
    )
  });

  return (
    <>
      
      <div className={ `${styles['words-grid']}` }>
        { cardsElements }
        { 
          currentStatus.currentLevel === 6 && !cardsElements.length &&
          <p className={ styles['no-words'] }>?????????? ???? ??????????????????</p>
        }
      </div>
    </>
  )
}

export default TextbookCards;
