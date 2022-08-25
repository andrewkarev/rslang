import React from 'react';
import styles from './selected-card.module.css';
import audio from './../../../assets/icons/audio.png';
import IWord from '../../../types/services-interfaces/IWord';

type Props = {
  currentWord: IWord;
}

const SelectedCard = (props: Props) => {
  const URL = 'https://rslangappteam102.herokuapp.com/';
  return (
    <div className={ styles['selected-card'] }>
      <img className={ styles['selected-card-image'] } 
        src={ props.currentWord ? `${ URL }${ props.currentWord.image }` : '' } 
        alt="selected card img"
      />
      <div className={ styles['word-wrapper'] }>
        <h2 className={ styles['word'] }>
          { props.currentWord ? props.currentWord.word : '' }
        </h2>
        <p className={ styles['translation'] }>
          { props.currentWord ? props.currentWord.wordTranslate : '' }
        </p>

        <div className={ styles['reading'] }>
          <p className={ styles['transcription'] }>
            { props.currentWord ? props.currentWord.transcription : '' }
          </p>
          <button className={ 'btn ' + styles['round-btn'] } id="word-audio-btn">
            <img src={ audio } alt="word audio btn" />
          </button>
        </div>
        <div className={ styles['btns'] }>
          <button className={ 'btn ' + styles['rounded-word-btn'] }>В сложные</button>
          <div className={ styles['btn-separator'] }></div>
          <button className={ 'btn ' + styles['rounded-word-btn'] }>В изученнные</button>
        </div>

        <div className={ styles['meaning'] }>
          <h3 className={ styles['title'] }>Значение</h3>
          <p 
            className={ styles['meaning-sentence'] } 
            dangerouslySetInnerHTML={{__html: props.currentWord ? props.currentWord.textMeaning : ''}}
          >
          </p>
          <p className={ styles['meaning-translation'] }>
            { props.currentWord ? props.currentWord.textMeaningTranslate : '' }
          </p>
        </div>

        <div className={ styles['example'] }>
          <h3 className={ styles['title'] }>Пример</h3>
          <p 
            className={ styles['example-sentence'] }
            dangerouslySetInnerHTML={{__html: props.currentWord ? props.currentWord.textExample : ''}}
          >
          </p>
          <p className={ styles['example-translation'] }>{ props.currentWord ? props.currentWord.textExampleTranslate : '' }</p>
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