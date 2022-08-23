import React, { MouseEvent, useRef, useState } from 'react';

import styles from './levels.module.css';

const Levels = () => {
  const levelsData = [
    { name: 'Beginner', shortName: 'A1' },
    { name: 'Elementary', shortName: 'A2' },
  
    { name: 'Intermediate', shortName: 'B1' },
    { name: 'Upper-Intermediate', shortName: 'B2' },
  
    { name: 'Advanced', shortName: 'C1' },
    { name: 'Proficiency', shortName: 'C2' }
  ];

  const initialLevel = localStorage.getItem('level') || 'A1-level';
  const [currentLevel, changeLevel] = useState(initialLevel);

  const handleLevelClick = (event: MouseEvent) => {
    const level = event.currentTarget as HTMLElement;
    changeLevel(level.id);

    localStorage.setItem('level', level.id);
  }

  const levelsElements = levelsData.map((level, index) => {

    return (
      <div 
        className={`${ styles['level'] } ${ `${level.shortName}-level` === currentLevel ? styles['active'] : ''}`} 
        key={ level.name } 
        onClick={ handleLevelClick }
        id = { level.shortName + '-level' }
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