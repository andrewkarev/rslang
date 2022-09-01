import React from 'react';
import styles from './advantagies.module.css';
import textbook from './../../../assets/images/books.png';
import padlock from './../../../assets/images/padlock.png';
import diagram from './../../../assets/images/diagram.png';
import trophy from './../../../assets/images/trophy.png';
import Advantagie from './advantagie/Advantagie';

const Advantagies = () => {
  const gamesData = [
    { 
      name: 'Учебник', 
      description: 'Более 3500 тысяч слов для изучения, разбитых на разделы по уровню твоей подготовки с удобной навигацией.', 
      image: textbook,
      url: '/textbook',
    },
    { 
      name: 'Регистрация', 
      description: 'Открывает доступ к разделам "Сложные слова", прогресс изучения слов, изученные слова и статистика', 
      image: padlock 
    },
    { 
      name: 'Статистика', 
      description: 'Отслеживайте статистику по мини-играм и по словам за каждый день изучения', 
      image: diagram,
      url: '/statistics',
    },
    { 
      name: 'Игры', 
      description: 'Спринт и Аудио-вызов - увлекательные игры на развитие запоминания слов, восприятия на слух и письма.', 
      image: trophy,
      url: '/games',
    },
  ];

  const gameElements = gamesData.map((adventagie) => {
    return (
      <Advantagie image={ adventagie.image } name={ adventagie.name } description={ adventagie.description } url={ adventagie.url} />
    )
  });

  return (
    <section className={ styles['advantagies']}>
      <div className={ styles['wrapper']}>
        <h2 className={ styles['title']}>Используйте все преимущества приложения</h2>
          <div className={ styles['content']}>
            { gameElements }
          </div>        
      </div>
    </section>
  );
}

export default Advantagies;