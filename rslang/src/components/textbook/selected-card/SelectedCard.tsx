import React, { MouseEvent, useContext } from 'react';
import styles from './selected-card.module.css';
import audio from './../../../assets/icons/audio.png';
import IWord from '../../../types/services-interfaces/IWord';
import { AuthorisationContext } from '../../../context/AuthorisationContext';
import { learWordAPI } from '../../..';
import IUserWord from '../../../types/services-interfaces/IUserWord';

type Props = {
  currentWord: IWord;
  userWord?: IUserWord;
  audioPlayer: HTMLAudioElement;
  setCurrentUserWord: (userWord: IUserWord) => void;
  //setWordStatus: (wordStatus: {isComplicated: boolean, isLearned: boolean}) => void
}

const SelectedCard: React.FC<Props> = ({ currentWord, userWord, audioPlayer, setCurrentUserWord}) => {
  const ROOT_URL = 'https://rslangappteam102.herokuapp.com/';

  const { isAuthorised } = useContext(AuthorisationContext);
  
  const handlerAudioBtnClick = (...args: (string | MouseEvent)[]) => {
    const audioUrls = args.slice(0, args.length - 1);
    let start = 0;
    
    audioPlayer.pause();
    audioPlayer.src = `${ROOT_URL}${audioUrls[start++]}`; 
    
    const canplay = () => {
      audioPlayer.play();
      audioPlayer.removeEventListener('canplay', canplay);
    }
    
    audioPlayer.addEventListener('canplay', canplay); 

    const startPlaying = () => {
      if (start < audioUrls.length) {
        audioPlayer.pause();
        audioPlayer.src = `${ROOT_URL}${audioUrls[start++]}`;
               
        audioPlayer.addEventListener('canplay', canplay); 
      } else {
        audioPlayer.removeEventListener('ended', startPlaying);
      }
    }

    audioPlayer.addEventListener('ended', startPlaying);
  }

  const updateDatabaseData = async (userId: string, word: IUserWord) => {
    if (!userWord) {
      await learWordAPI.createUserWord(
        userId, 
        currentWord.id, 
        word
      );
    } else {
      await learWordAPI.updateUserWord(
        userId, 
        currentWord.id, 
        word
      );
    }
    
    setCurrentUserWord({id: userId, wordId: currentWord.id, ...word});
  }

  const handlerComplicatedBtnClick = async () => {
    const userId = localStorage.getItem('id');

    if (userId) {
      const word = {
        optional: {
          isNew: false, 
          isDifficult: true, 
          isLearned: false, 
          correctAnswersStreak: 0,
          games: {
            sprint: {
              answersAtAll: 0,
              correctAnswers: 0
            },
            audioCall: {
              answersAtAll: 0,
              correctAnswers: 0
            },
          }
        }
      }

      await updateDatabaseData(userId, word);
    }
  }

  const handlerLearnedBtnClick = async () => {
    const userId = localStorage.getItem('id');

    if (userId) {
      const word = {
        optional: {
          isNew: false, 
          isDifficult: false, 
          isLearned: true, 
          correctAnswersStreak: 0,
          games: {
            sprint: {
              answersAtAll: 0,
              correctAnswers: 0
            },
            audioCall: {
              answersAtAll: 0,
              correctAnswers: 0
            },
          }
        }
      }

      updateDatabaseData(userId, word)
    }
  }
  
  return (
    <div className={ styles['selected-card'] }>
      <img className={ styles['selected-card-image'] } 
        src={ currentWord ? `${ ROOT_URL }${ currentWord.image }` : '' } 
        alt="selected card img"
      />
      <div className={ styles['word-wrapper'] }>
        <h2 className={ styles['word'] }>
          {currentWord ? currentWord.word : '' }
        </h2>
        <p className={ styles['translation'] }>
          { currentWord ? currentWord.wordTranslate : '' }
        </p>

        <div className={ styles['reading'] }>
          <p className={ styles['transcription'] }>
            { currentWord ? currentWord.transcription : '' }
          </p>
          <button 
            className={ 'btn ' + styles['round-btn'] } 
            onClick={ currentWord ? handlerAudioBtnClick.bind(
              null, 
              currentWord.audio, 
              currentWord.audioMeaning, 
              currentWord.audioExample
            ) : undefined }
          >
            <img src={ audio } alt="word audio btn" />
          </button>
        </div>
        { 
          isAuthorised &&
          <div className={ styles['btns'] }>
            { 
              //!wordStatus?.isComplicated && !wordStatus?.isLearned &&
              !userWord?.optional.isDifficult && !userWord?.optional.isLearned &&
              <>
                <button 
                  className={ `btn ${styles['rounded-word-btn'] }` }
                  onClick={ handlerComplicatedBtnClick }
                >
                  В сложные
                </button>
                <div className={ styles['btn-separator'] }></div>
              </>
            }
            {
              //!wordStatus?.isLearned &&
              !userWord?.optional.isLearned &&
              <button 
                className={ `btn ${styles['rounded-word-btn'] }` }
                onClick={ handlerLearnedBtnClick }
              >
                В изученнные
              </button>
            } 
            
          </div>
          
        }

        <div className={ styles['meaning'] }>
          <h3 className={ styles['title'] }>Значение</h3>
          <p 
            className={ styles['meaning-sentence'] } 
            dangerouslySetInnerHTML={{__html: currentWord ? currentWord.textMeaning : ''}}
          >
          </p>
          <p className={ styles['meaning-translation'] }>
            { currentWord ? currentWord.textMeaningTranslate : '' }
          </p>
        </div>

        <div className={ styles['example'] }>
          <h3 className={ styles['title'] }>Пример</h3>
          <p 
            className={ styles['example-sentence'] }
            dangerouslySetInnerHTML={{__html: currentWord ? currentWord.textExample : ''}}
          >
          </p>
          <p className={ styles['example-translation'] }>
            { currentWord ? currentWord.textExampleTranslate : '' }
          </p>
        </div>
        
        <div className={ styles['in-games'] }>
          <h3 className={ styles['title'] }>Встречалось в играх</h3>
          <div className={ styles['results'] }>
            <div className={ styles['game'] }>
              <h4 className={ styles['game-name'] }>Спринт</h4>
              <p className={ styles['result'] }>0</p>
            </div>
            <div className={ styles['game'] }>
              <h4 className={ styles['game-name'] }>Аулио-вызов</h4>
              <p className={ styles['result'] }>0 из 1</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default SelectedCard;