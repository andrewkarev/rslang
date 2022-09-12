import textbook from '../assets/images/books.png';
import padlock from '../assets/images/padlock.png';
import diagram from '../assets/images/diagram.png';
import trophy from '../assets/images/trophy.png';

const advantagesData = [
  {
    name: 'Учебник',
    description: 'Изучите все слова из нашего учебника! Более 3500 тысяч слов в 6 разделах, позволяющих постепенно повышать сложность',
    image: textbook,
    url: '/textbook',
  },
  {
    name: 'Регистрация',
    description: 'Откройте доступ к разделу "Сложные слова" и странице статистики. Отмечайте слова как сложные или изученные',
    image: padlock
  },
  {
    name: 'Статистика',
    description: 'Отслеживайте прогресс в изучении слов и следите за успехами в мини-играх',
    image: diagram,
    url: '/statistics',
  },
  {
    name: 'Игры',
    description: 'Повторяйте слова или изучайте новые в увлекательных играх Спринт и Аудио-вызов',
    image: trophy,
    url: '/games',
  },
];

export default advantagesData;