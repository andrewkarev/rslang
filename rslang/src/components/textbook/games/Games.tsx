import React from 'react';
import './games.css';
import sprintImage from './../../../assets/images/sprint.png';
import audioCallImage from './../../../assets/images/audio-call.png';

const Games = () => {
  
  return (
    <div className="games">
      <h2 className="title">Игры</h2>
      <p className="description">Закрепите слова с текущей страницы при помощи игр</p>
      <div className="games-wrapper">
        <div className="game">
          <h3 className="game-name">Спринт</h3>
          <div className="game-description">На время определите, верно ли утвеждение или нет</div>
          <img className="game-img" src={ sprintImage } alt="" />
        </div>
        <div className="game">
          <h3 className="game-name">Аудио-вызов</h3>
          <div className="game-description">Определите на слух, какое слово было произнесено</div>
          <img className="game-img"src={ audioCallImage } alt="" />
        </div>
      </div>
    </div>
  );
}

export default Games;