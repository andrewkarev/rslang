import IWord from '../types/services-interfaces/IWord';

const shuffle = (array: IWord[]) => {
  const shuffled: IWord[] = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export default shuffle;
