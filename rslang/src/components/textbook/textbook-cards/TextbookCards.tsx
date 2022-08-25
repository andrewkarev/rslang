import React, { MouseEvent, useState } from 'react';
import IWord from '../../../types/services-interfaces/IWord';
import styles from './textbook-cards.module.css';

type Props = {
  words: IWord[];
  setCurrentCard: (cardId: number) => void;
}

const TextbookCards = (props: Props) => {
  const cardsData = new Array(props.words.length).fill({ word: 'Word', translation: 'перевод' });
  const [currentCard, setCurrentCard] = useState(0);

  const handlerCardClick = (cardId: number, event: MouseEvent) => {
    setCurrentCard(cardId);
    props.setCurrentCard(cardId);

    localStorage.setItem('word', props.words[cardId].id);
  }

  const cardsElements = cardsData.map((card, index) => {
    return (
      <div 
        className={ `${styles['card']} ${index === currentCard ? styles['active'] : ''}` } 
        onClick={ handlerCardClick.bind(null, index) }
        key={ index + 'card' }
      >
        <h3 className={ styles['word'] }>
          { props.words[index].word }
        </h3> 
        <p className={ styles['translation'] }>
          { props.words[index].wordTranslate }
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
