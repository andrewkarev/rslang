import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import styles from './selected-card.module.css';
import audio from './../../../assets/icons/audio.png';
import IWord from '../../../types/services-interfaces/IWord';
import { AuthorisationContext } from '../../../context/AuthorisationContext';
import { learWordAPI } from '../../..';

type Props = {
  currentWord: IWord;
}

const SelectedCard: React.FC<Props> = ({ currentWord }) => {
  const ROOT_URL = 'https://rslangappteam102.herokuapp.com/';

  const { isAuthorised } = useContext(AuthorisationContext);
  const [isComplicated, setComplicated] = useState(false);
  const [isLearned, setLearned] = useState(false);
  
  const audioPlayer = new Audio();

  const handlerAudioBtnClick = (...args: (string | MouseEvent)[]) => {
    const audioUrls = args.slice(0, args.length - 1);
    let start = 0;

    audioPlayer.src = `${ROOT_URL}${audioUrls[start++]}`;
    audioPlayer.pause();
    audioPlayer.play();

    const startPlaying = () => {
      if (start < audioUrls.length) {
        audioPlayer.src = `${ROOT_URL}${audioUrls[start++]}`;
        const promise = audioPlayer.play();
        
        if (promise !== null){
          promise.catch(() => { audioPlayer.play(); })
        }
      } else {
        audioPlayer.removeEventListener('ended', startPlaying);
      }
    }

    audioPlayer.addEventListener('ended', startPlaying);
  }

  const handlerComplicatedBtnClick = async () => {
    setComplicated(true);

    const userId = localStorage.getItem('id');
    if (userId) {
      await learWordAPI.createUserWord(
        userId, 
        currentWord.id, 
        {
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
      )
    }
  }

  const handlerLearnedBtnClick = () => {
    setLearned(true);
    setComplicated(false);
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
              !isComplicated && !isLearned &&
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
              !isLearned &&
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