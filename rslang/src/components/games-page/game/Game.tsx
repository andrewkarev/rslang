import React from 'react';
import styles from'./game.module.css';

type Props = {
  name: string,
  description: string
};

const Game = (props: Props) => {

  return (
    <div className={ styles['game'] }>
      <div className={ styles['about-game'] }>
        <h3 className={ styles['game-name'] }>{ props.name }</h3>
        <p className={ styles['game-description'] }>
          { props.description }
        </p>
        <p className={ styles['levels-intro'] }>Выберите уровень:</p>
        <div className={ styles['levels'] }>
          <div className={ styles['level'] + ' ' + styles['level-a1'] }>A1</div>
          <div className={ styles['level'] + ' ' + styles['level-a2'] }>A2</div>
          <div className={ styles['level'] + ' ' + styles['level-b1'] }>B1</div>
          <div className={ styles['level'] + ' ' + styles['level-b2'] }>B2</div>
          <div className={ styles['level'] + ' ' + styles['level-c1'] }>C1</div>
          <div className={ styles['level'] + ' ' + styles['level-c2'] }>C2</div>
        </div>
        <button className={ 'btn ' + styles['start-game-btn'] }>Играть</button>
      </div>
    </div>
  );
}

export default Game;