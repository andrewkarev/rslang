import React from 'react';
import styles from './adventagies.module.css';
import textbook from './../../../assets/images/books.png';
import padlock from './../../../assets/images/padlock.png';
import diagram from './../../../assets/images/diagram.png';
import trophy from './../../../assets/images/trophy.png';
import Adventagie from './adventagie/Adventagie';

const Games = () => {
  const gamesData = [
    { 
      name: 'Учебник', 
      description: 'Более 3500 тысяч слов для изучения, разбитых на разделы по уровню твоей подготовки с удобной навигацией.', 
      image: textbook 
    },
    { 
      name: 'Регистрация', 
      description: 'Открывает доступ к разделам "Сложные слова", прогресс изучения слов, изученные слова и статистика', 
      image: padlock 
    },
    { 
      name: 'Статистика', 
      description: 'Отслеживайте статистику по мини-играм и по словам за каждый день изучения', 
      image: diagram 
    },
    { 
      name: 'Игры', 
      description: 'Спринт и Аудио-вызов - увлекательные игры на развитие запоминания слов, восприятия на слух и письма.', 
      image: trophy 
    },
  ];

  const gameElements = gamesData.map((adventagie) => {
    return (
      <Adventagie image={ adventagie.image } name={ adventagie.name } description={ adventagie.description } />
    )
  });

  return (
    <section className={ styles['adventagies']}>
      <div className={ styles['wrapper']}>
        <h2 className={ styles['adventagies-title']}>Используйте все преимущества приложения</h2>
          <div className={ styles['adventagies-content']}>
            { gameElements }
          </div>        
      </div>
    </section>
  );
}

export default Games;