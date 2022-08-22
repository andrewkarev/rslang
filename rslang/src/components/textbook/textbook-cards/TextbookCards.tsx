import React from 'react';
import styles from './textbook-cards.module.css';

const TextbookCards = () => {
  const cardsData = new Array(20).fill({ word: 'Word', translation: 'перевод' });

  const cardsElements = cardsData.map((card, index) => {
    return (
      <div className={ styles['card'] } key={ index + 'card' }>
        <h3 className={ styles['word'] }>
          { card.word + (index + 1) }
        </h3> 
        <p className={ styles['translation'] }>
          { card.translation + (index + 1) }
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
