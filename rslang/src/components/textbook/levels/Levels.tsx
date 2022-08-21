import React from 'react';
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

  const levelsElements = levelsData.map((level) => {
    return (
      <div className={ styles['level'] } key={ level.name }>
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