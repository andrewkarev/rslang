import IWord from '../types/services-interfaces/IWord';

const getRandomIndex = (array: IWord[]): number => {
  return Math.floor(Math.random() * array.length);
};

export default getRandomIndex;
