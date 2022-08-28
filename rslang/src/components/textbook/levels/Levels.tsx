import React, { MouseEvent, useContext } from 'react';
import { AuthorisationContext } from '../../../context/AuthorisationContext';
import levelsData from '../../../data/levels-data';
import styles from './levels.module.css';

type Props = {
  currentStatus: {currentLevel: number, currentCard: number, currentPage: number}
  setCurrentStatus: (status: {currentLevel: number, currentCard: number, currentPage: number}) => void;
}

const Levels: React.FC<Props> = ({ currentStatus, setCurrentStatus }) => {
  const { isAuthorised } = useContext(AuthorisationContext);

  const handleLevelClick = (levelId: number, event: MouseEvent) => {
    
    setCurrentStatus({ currentLevel: levelId, currentPage: 0, currentCard: 0 });
    
    //setComplicated(false);

    localStorage.setItem('level', String(levelId));
    localStorage.setItem('page', '0');
    localStorage.setItem('card', '0');
  }

  const handleComplicatedLevelClick = (event: MouseEvent) => {
    setCurrentStatus( { currentLevel: 7, currentPage: 0, currentCard: 0} );
    // setComplicated(true);

    //localStorage.setItem('level', '7');
    // localStorage.setItem('page', '0');
    // localStorage.setItem('card', '0');
  }

  const levelsElements = levelsData.map((level, index) => {
    return (
      <div 
        className={`${ styles['level'] } ${ level.group === currentStatus.currentLevel ? styles['active'] : ''}`} 
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
          <div 
            className={ `${ styles['level']} level-complicated` } 
            onClick={ handleComplicatedLevelClick }
            key='D'
          >
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