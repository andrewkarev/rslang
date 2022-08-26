import React, { MouseEvent, useContext, useState } from 'react';
import { AuthorisationContext } from '../../../context/AuthorisationContext';
import IUserWord from '../../../types/services-interfaces/IUserWord';
import IWord from '../../../types/services-interfaces/IWord';
import styles from './textbook-cards.module.css';

type Props = {
  words: IWord[];
  currentUserWords: IUserWord[];
  currentCard: number;
  setCurrentCard: (cardId: number) => void;
}

const TextbookCards: React.FC<Props> = ({ words, currentUserWords, currentCard, setCurrentCard }) => {
  const cardsData = new Array(words.length).fill({ word: '', translation: '' });
  const { isAuthorised } = useContext(AuthorisationContext);

  const handlerCardClick = (card: number, event: MouseEvent) => {
    setCurrentCard(card);

    localStorage.setItem('card', `${card}`);
  }

  const checkOnComplecated = (wordId: string) => {
    if (currentUserWords) {
      console.log(currentUserWords);
      const isUserWordComplicated = 
        currentUserWords.find((word) => word.wordId === wordId && word.optional.isDifficult);
        return isUserWordComplicated;
    }
    return false;
  }

  const cardsElements = cardsData.map((card, index) => {
    return (
      <div 
        className={ `${styles['card']} ${index === currentCard ? styles['active'] : ''}` } 
        onClick={ handlerCardClick.bind(null, index) }
        key={ index + 'card' }
      >
        <h3 className={ styles['word'] }>
          { words[index].word }
        </h3> 
        <p className={ styles['translation'] }>
          { words[index].wordTranslate }
        </p>
        <p>
          { isAuthorised && checkOnComplecated(words[index].id) ? 'сложное' : ''}
        </p>
      </div>
    )
  });

  return (
    <div className={ styles['words-grid'] }>
      { cardsElements }
    </div>
  )
}

export default TextbookCards;
