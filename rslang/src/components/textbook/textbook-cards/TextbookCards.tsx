import React, { MouseEvent, useState } from 'react';
import IWord from '../../../types/services-interfaces/IWord';
import styles from './textbook-cards.module.css';

type Props = {
  words: IWord[];
  currentCard: number;
  setCurrentCard: (cardId: number) => void;
}

const TextbookCards: React.FC<Props> = ({ words, currentCard, setCurrentCard }) => {
  const cardsData = new Array(words.length).fill({ word: '', translation: '' });

  const handlerCardClick = (cardId: number, event: MouseEvent) => {
    setCurrentCard(cardId);

    localStorage.setItem('word', words[cardId].id);
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
