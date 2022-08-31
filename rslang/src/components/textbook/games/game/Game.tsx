import React from 'react';
import styles from './game.module.css';

type Props = {
  name: string;
  description: string
  image: string;
  isLearnedPage: boolean;
};

const Game: React.FC<Props> = ({ name, description, image, isLearnedPage }) => {
  return (
    <div className={ `${styles['game']} ${isLearnedPage ? styles['disabled'] : ''}` }>
      <h3 className={ styles['game-name'] }>{ name }</h3>
      <div className={ styles['game-description'] }>{ description }</div>
      <img className={ styles['game-img'] } src={ image } alt="game img" />
    </div>
  );
}

export default Game;