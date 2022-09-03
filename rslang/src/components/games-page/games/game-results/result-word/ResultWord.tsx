import React from 'react';
import styles from './result-word.module.css';
import IWord from '../../../../../types/services-interfaces/IWord';
import useSound from 'use-sound';

interface ResultWordProps {
  result: { word: IWord, isCorrect: boolean },
}

const ResultWord: React.FunctionComponent<ResultWordProps> = ({ result }) => {
  const BASE_URL = 'https://rslangappteam102.herokuapp.com';
  const AUDIO_URL = result.word.audio;
  const [pronunciation] = useSound(BASE_URL + '/' + AUDIO_URL);

  const handleClick = () => {
    pronunciation();
  };

  return (
    <tr>
      <td>
        <button
          className={styles['word-pronunciation']}
          onClick={handleClick}
        >
        </button>
      </td>
      <td className={styles['word']}>
        {result.word.word}
      </td>
      <td className={styles['word-transcription']}>
        {result.word.transcription}
      </td>
      <td className={styles['word-translation']}>
        {result.word.wordTranslate}
      </td>
      <td>
        <div
          className={styles[`${result.isCorrect
            ? 'answer-status-correct'
            : 'answer-status-wrong'}`]}
        >
        </div>
      </td>
    </tr>
  );
}

export default ResultWord;
