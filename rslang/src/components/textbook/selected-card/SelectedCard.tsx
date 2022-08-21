import React from 'react';
import styles from './selected-card.module.css';
import audio from './../../../assets/icons/audio.png';

const SelectedCard = () => {
  return (
    <div className={ styles['selected-card'] }>
      <img className={ styles['selected-card-image'] } 
        src="https://rslang-team69.herokuapp.com/files/01_3006.jpg" 
        alt="selected card img"
      />
      <div className={ styles['word-wrapper'] }>
        <h2 className={ styles['word'] }>convenient</h2>
        <p className={ styles['translation'] }>удобный</p>

        <div className={ styles['reading'] }>
          <p className={ styles['transcription'] }>[kənvíːnjənt]</p>
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
          <p className={ styles['meaning-sentence'] }>When something is convenient, it saves you time or effort.</p>
          <p className={ styles['meaning-translation'] }>Когда что-то удобно, это экономит ваше время или усилия</p>
        </div>

        <div className={ styles['example'] }>
          <h3 className={ styles['title'] }>Пример</h3>
          <p className={ styles['example-sentence'] }>Walking through the park is a convenient way to exercise on the way to work.</p>
          <p className={ styles['example-translation'] }>Прогулка по парку - это удобный способ тренировки по дороге на работу</p>
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