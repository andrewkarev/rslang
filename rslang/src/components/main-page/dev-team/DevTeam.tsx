import React from 'react';
import styles from './dev-team.module.css';
import avatar_sasha from '../../../assets/images/avatar_sasha.jpg';
import avatar_andrei from '../../../assets/images/avatar_andrei.jpg';
import avatar_tatyana from '../../../assets/images/avatar_tatyana.jpg';
import github from '../../../assets/icons/github.svg';
import Developer from './developer/Developer';

const DevTeam = () => {
  const devTeamData = [
    {
      avatar: avatar_andrei, 
      name: 'Андрей',
      link: 'https://github.com/andrewkarev',
      github: github,
      description: 'Саппорт на этом проекте, который постоянно делает много маленьких, но важных вещей. Неожиданно много занималась визуалом и вёрсткой — ну кто-то же должен. Разработала игру «Оазис», в которой необходимо ввести пропущенное в предложении слово. Придала 3/4 игр внешний вид, сверстала словарь и учебник, сделала их настройки, а еще графики, компоненты для отображения статистики, а также страницу авторизации.',
    },
    {
      avatar: avatar_tatyana, 
      name: 'Татьяна',
      link: 'https://github.com/kritskaya',
      github: github,
      description: 'В основном, занималась играми: сделала начальный экран и вывод их результатов, проследила, чтобы всем играм хватало слов. Разработала игру «Саванна» - анимации в ней дались особенно непросто. А кристаллик, в который попадает слово при правильном ответе! Первый раз настроила редакс для получения данных из глобального стейта - кажется, в итоге он пригодился всему проекту. Версткой тоже пришлось заняться - сверстала главную страницу и адаптивное меню.',
    },
    {
      avatar: avatar_sasha, 
      name: 'Александр',
      link: 'https://github.com/RabykoSasha',
      github: github,
      description: '«Две недели пытался понять ТЗ, неделю делал пагинацию. Возьмите джуном.»',
    },
  ];

  const cardElements = devTeamData.map((developer) => {
    return (
      <Developer avatar={ developer.avatar } name={ developer.name } link = { developer.link } github = { developer.github } description={ developer.description } />
    )
  });

  return (
    <section className={ styles['dev-team']}>
      <div className={ styles['wrapper']}>
        <h2 className={ styles['title']}>Познакомьтесь с нашей командой</h2>
        <div className={ styles['content']}>
          { cardElements }
        </div>        
      </div>
      <div className={ styles['wave'] }>
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 280">
  <path fill="#F8B81F" fill-opacity="1" d="M0,160L60,176C120,192,240,224,360,234.7C480,245,600,235,720,213.3C840,192,960,160,1080,154.7C1200,149,1320,171,1380,181.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
</svg>
      </div>
    </section>
  );
}

export default DevTeam;