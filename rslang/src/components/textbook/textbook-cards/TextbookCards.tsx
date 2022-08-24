import React from 'react';
import IWord from '../../../types/services-interfaces/IWord';
import styles from './textbook-cards.module.css';

type Props = {
  words: IWord[];
}

const TextbookCards = (props: Props) => {
  const cardsData = new Array(props.words.length).fill({ word: 'Word', translation: 'перевод' });

  const cardsElements = cardsData.map((card, index) => {
    return (
      <div className={ styles['card'] } key={ index + 'card' }>
        <h3 className={ styles['word'] }>
          { props.words[index].word }
        </h3> 
        <p className={ styles['translation'] }>
          { props.words[index].wordTranslate }
        </p>
      </div>
    )
  });

  //console.log(props.words);

  return (
    <div className={ styles['words-grid'] }>
      { cardsElements }
    </div>
  )
}

export default TextbookCards;
