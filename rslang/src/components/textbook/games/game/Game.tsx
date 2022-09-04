import React, { useContext } from 'react';
import { learnWordAPI } from '../../../..';
import { AuthorisationContext } from '../../../../context/AuthorisationContext';
import shuffle from '../../../../services/shuffle';
import IUserWord from '../../../../types/services-interfaces/IUserWord';
import IWord from '../../../../types/services-interfaces/IWord';
import styles from './game.module.css';

type Props = {
  name: string;
  description: string
  image: string;
  isLearnedPage: boolean;
  currentLevelWords: IWord[];
  currentUserWords: IUserWord[];
  currentStatus: {currentLevel: number, currentCard: number, currentPage: number};
};

const Game: React.FC<Props> = ({
  name,
  description,
  image,
  isLearnedPage,
  currentLevelWords,
  currentUserWords,
  currentStatus
}) => {

  const { isAuthorised } = useContext(AuthorisationContext);

  const handleGameBtnClick = async () => {
    console.log(await getWords());
    console.log(currentLevelWords.length)
  }

  const getWords = async () => {
    if (!isAuthorised) return currentLevelWords;

    const getNotLearnedWords = (words: IWord[]) => {
      return words.filter((word) => 
        !currentUserWords.find((userWord) => userWord.wordId === word.id && userWord.optional.isLearned)
      );
    }
        
    const gameWords = getNotLearnedWords(currentLevelWords);

    let pageForLookup = currentStatus.currentPage;

    while (gameWords.length < 20) {
      
      if (pageForLookup > 0) {
        const response = await learnWordAPI.getWords(currentStatus.currentLevel, --pageForLookup);
        
        if (!response) return;
      
        const previousPageWords = getNotLearnedWords(response);
        
        const shuffledWords = shuffle(previousPageWords);
        const required = 20 - gameWords.length;

        gameWords.push(...shuffledWords.slice(0, required));
      } else {
        break;
      }
    }

    return gameWords;
  }

  return (
    <div 
      className={ `${styles['game']} ${isLearnedPage && currentStatus.currentLevel !== 6 || !currentLevelWords.length ? styles['disabled'] : ''}` }
      onClick={ isLearnedPage && currentStatus.currentLevel !== 6 || !currentLevelWords.length ?  undefined :  handleGameBtnClick }
    >
      <h3 className={ styles['game-name'] }>{ name }</h3>
      <div className={ styles['game-description'] }>{ description }</div>
      <img className={ styles['game-img'] } src={ image } alt="game img" />
    </div>
  );
}

export default Game;