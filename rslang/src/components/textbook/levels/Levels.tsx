import React, { MouseEvent, useEffect, useState } from 'react';
import levelsData from '../../../data/levels-data';
import styles from './levels.module.css';

type Props = {
  currentLevel: string;
  changeLevel: (level: string) => void;
  getWords: (level: number, page: number) => void;
}

const Levels = (props: Props) => {
   
  const handleLevelClick = async (event: MouseEvent) => {
    const level = event.currentTarget as HTMLElement;
    props.changeLevel(level.id);

    const levelIdNumber = Number(level.id.slice(level.id.indexOf('-') + 1));
    
    await props.getWords(levelIdNumber, 1);
    localStorage.setItem('level', level.id);
  }

  const levelsElements = levelsData.map((level) => {
    return (
      <div 
        className={`${ styles['level'] } ${ `level-${level.group}` === props.currentLevel ? styles['active'] : ''}`} 
        key={ level.name } 
        onClick={ handleLevelClick }
        id = { `level-${level.group}` }
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