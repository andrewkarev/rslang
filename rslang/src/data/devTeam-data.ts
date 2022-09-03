import avatar_sasha from '../assets/images/avatar_sasha.jpg';
import avatar_andrei from '../assets/images/avatar_andrei.jpg';
import avatar_tatyana from '../assets/images/avatar_tatyana.jpg';
import github from '../assets/icons/github.svg';

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

export default devTeamData;