import React from 'react';
import './selected-card.css';
import imag from './../../../assets/icons/audio.png';

const SelectedCard = () => {
  return (
    <div className="selected-card">
      <img className="s-card-image" 
        src="https://rslang-team69.herokuapp.com/files/01_3006.jpg" 
        alt="selected card img"
      />
      <div className="word-wrapper">
        <h2 className="word">convenient</h2>
        <p className="translation">удобный</p>

        <div className="reading">
          <p className="transcription">[kənvíːnjənt]</p>
          <button className="btn round-btn" id="word-audio-btn">
            <img src={ imag } alt="word audio btn" />
          </button>
        </div>
        <button className="btn hard-word-btn">Добавить в сложные</button>

        <div className="meaning">
          <h3 className="title">Значение</h3>
          <p className="meaning-sentence">When something is convenient, it saves you time or effort.</p>
          <p className="meaning-translation">Когда что-то удобно, это экономит ваше время или усилия</p>
        </div>

        <div className="example">
          <h3 className="title">Пример</h3>
          <p className="example-sentence">Walking through the park is a convenient way to exercise on the way to work.</p>
          <p className="example-translation">Прогулка по парку - это удобный способ тренировки по дороге на работу</p>
        </div>
        
        <div className="in-games">
          <h3 className="title">Встречалось в играх</h3>
          <div className="results">
            <div className="game">
              <h4 className="game-name">Спринт</h4>
              <p className="result">0</p>
            </div>
            <div className="game">
              <h4 className="game-name">Аулио-вызов</h4>
              <p className="result">0 из 1</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default SelectedCard;