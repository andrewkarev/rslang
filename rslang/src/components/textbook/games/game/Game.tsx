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

const Game: React.FC<Props> = (props: Props) => {

  const { isAuthorised } = useContext(AuthorisationContext);

  const handleGameBtnClick = async () => {
    console.log(await getWords());
  }

  const getWords = async () => {
    if (!isAuthorised) return props.currentLevelWords;

    const gameWords = props.currentLevelWords.filter((word) => 
      !props.currentUserWords.find((userWord) => userWord.wordId === word.id && userWord.optional.isLearned)
    );

    let pageForLookup = props.currentStatus.currentPage;

    while (gameWords.length < 20) {
      
      if (pageForLookup > 0) {
        const response = await learnWordAPI.getWords(props.currentStatus.currentLevel, --pageForLookup);
        
        if (!response) return;
      
        const previousPageWords = response.filter((word) => 
          !props.currentUserWords.find((userWord) => userWord.wordId === word.id && userWord.optional.isLearned)
        );
        //console.log(previousPageWords);
        const shuffledWords = shuffle(previousPageWords);
        const required = 20 - gameWords.length;

        console.log(required)
        gameWords.push(...shuffledWords.slice(0, required));
      } else {
        break;
      }
    }

    return gameWords;
  }

  return (
    <div 
      className={ `${styles['game']} ${props.isLearnedPage ? styles['disabled'] : ''}` }
      onClick={ !props.isLearnedPage ? handleGameBtnClick : undefined }
    >
      <h3 className={ styles['game-name'] }>{ props.name }</h3>
      <div className={ styles['game-description'] }>{ props.description }</div>
      <img className={ styles['game-img'] } src={ props.image } alt="game img" />
    </div>
  );
}

export default Game;