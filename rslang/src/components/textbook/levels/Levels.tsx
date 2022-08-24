import React, { MouseEvent, useEffect, useState } from 'react';
import levelsData from '../../../data/levels-data';
import styles from './levels.module.css';

type Props = {
  currentLevel: number;
  changeLevel: (level: number) => void;
  getWords: (level: number, page: number) => void;
}

const Levels = (props: Props) => {
   
  const handleLevelClick = async (levelId: number, event: MouseEvent) => {
    props.changeLevel(levelId);

    await props.getWords(levelId, 1);
    localStorage.setItem('level', String(levelId));
  }

  const levelsElements = levelsData.map((level, index) => {
    return (
      <div 
        className={`${ styles['level'] } ${ level.group === props.currentLevel ? styles['active'] : ''}`} 
        key={ level.name } 
        onClick={ handleLevelClick.bind(null, index) }
      >
        <div className={ styles['level-name'] }>{ level.name }</div>
        <div className={ styles['level-shortname'] }>{ level.shortName }</div>
        <div className={ styles['arrow'] }></div>
      </div>
    );
  });

  return (
    <div className={ styles['levels'] }>
      { levelsElements }
      <div className={ styles['separator'] }></div>
      <div className={ styles['level'] + ' level-complicated' } key='D'>
        <div className={ styles['level-name'] + ' level-complicated-name' }>Сложные слова</div>
        <div className={ styles['level-counter'] }>(0)</div>
        <div className={ styles['arrow'] }></div>
      </div>
    </div>
  );
}
 
export default Levels;