import React from 'react';
import IWord from '../../../../types/services-interfaces/IWord';

interface GameResultsProps {
  lastGameResults: { word: IWord, isCorrect: boolean }[] | [],
  setIsResultsVisible: (value: React.SetStateAction<boolean>) => void,
}

const GameResults: React.FunctionComponent<GameResultsProps> = (props) => {
  return (
    <div className="wrapper">
      <button
        onClick={() => { props.setIsResultsVisible(false) }}
      >
        Close
      </button>
    </div>
  );
};

export default GameResults;
