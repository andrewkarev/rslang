import React from 'react';
import './games.css';

const Games = () => {
  
  return (
    <div className="games">
      <h2 className="title">Игры</h2>
      <p className="description">Закрепи слова с текущей страницы при помощи игр</p>
      <div className="games-wrapper">
        <div className="game">
          <h3 className="game-name">Спринт</h3>
          <div className="game-description">На время определи, верно ли утвеждение или нет</div>
          <img className="game-img" src="https://res.cloudinary.com/travel-app/image/upload/v1617587319/rslang/111.png" alt="" />
        </div>
        <div className="game">
          <h3 className="game-name">Аудио-вызов</h3>
          <div className="game-description">Определи на слух, какое слово было произнесено</div>
          <img className="game-img"src="https://res.cloudinary.com/travel-app/image/upload/v1617587319/rslang/44.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Games;