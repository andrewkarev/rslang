import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import { AuthorisationContext } from '../../../context/AuthorisationContext';
import levelsData from '../../../data/levels-data';
import styles from './levels.module.css';

type Props = {
  currentLevel: number;
  setCurrentLevel: (level: number) => void;
  setCurrentCard: (card: number) => void;
  setCurrentPage: (page: number) => void;
}

const Levels: React.FC<Props> = ({ currentLevel, setCurrentLevel, setCurrentCard, setCurrentPage }) => {
  const { isAuthorised } = useContext(AuthorisationContext);

  const handleLevelClick = async (levelId: number, event: MouseEvent) => {
    setCurrentLevel(levelId);
    setCurrentCard(0);
    setCurrentPage(0);

    localStorage.setItem('level', String(levelId));
    localStorage.setItem('page', '0');
    localStorage.setItem('card', '0');
  }

  const levelsElements = levelsData.map((level, index) => {
    return (
      <div 
        className={`${ styles['level'] } ${ level.group === currentLevel ? styles['active'] : ''}`} 
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
      { 
        isAuthorised &&
        <>
          <div className={ styles['separator'] }></div>
          <div className={ styles['level'] + ' level-complicated' } key='D'>
            <div className={ styles['level-name'] + ' level-complicated-name' }>Сложные слова</div>
            <div className={ styles['level-counter'] }>(0)</div>
            <div className={ styles['arrow'] }></div>
          </div>
        </>
      }
    </div>
  );
}
 
export default Levels;