import React from 'react';
import styles from './level.module.css';

type Props = {
  levelState: number | undefined,
  isButtonActive: boolean,
  handleLevelClick: (level: number) => void,
  order: number,
  levelMark: string,
};

const Level = (props: Props) => {
  return (
    <div
      className={styles[`${(props.levelState === props.order && props.isButtonActive)
        ? `level-active-${props.levelMark}`
        : 'level'}`] + ' ' + styles[`level-${props.levelMark}`]}
      onClick={() => props.handleLevelClick(props.order)}>
      {props.levelMark.toUpperCase()}
    </div>
  );
}

export default Level;