import React from 'react';
import './textbook-cards.css';

const TextbookCards = () => {
  const cardsData = new Array(20).fill({ word: 'Word', translation: 'перевод' });
  const cardsElements = cardsData.map((card, index) => {
    return (
      <div className="card" key={ index + 'card' }>
        <h3 className="word">{ card.word + (index + 1)}</h3> 
        <p className="translation">{ card.translation + (index + 1)}</p>
      </div>
    )
  });

  return (
    <div className="words-grid">
      { cardsElements }
    </div>
  )
}

export default TextbookCards;
