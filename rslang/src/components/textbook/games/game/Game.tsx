import React from 'react';
import styles from './game.module.css';

type Props = {
  name: string,
  description: string,
  image: string
};

const Game = (props: Props) => {
  return (
    <div className={ styles['game'] }>
      <h3 className={ styles['game-name'] }>{ props.name }</h3>
      <div className={ styles['game-description'] }>{ props.description }</div>
      <img className={ styles['game-img'] } src={ props.image } alt="game img" />
    </div>
  );
}

export default Game;