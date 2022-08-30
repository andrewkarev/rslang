import React, { useEffect, useState } from 'react';
import styles from './game-card.module.css';

type Props = {
  name: string,
  description: string,
  chosenGameCard: {
    sprint: boolean,
    audioCall: boolean,
  },
  setChosenGameCard: (value: React.SetStateAction<{
    sprint: boolean;
    audioCall: boolean;
  }>) => void,
  handleGameChoice: (choice: string) => void,
  setWordsGroup: (value: React.SetStateAction<number>) => void,
};

const GameCard = (props: Props) => {
  const [level, setLevel] = useState<number>();
  const [isButtonActive, setIsButtonActive] = useState(false);

  const clickHandler = () => {
    props.handleGameChoice(props.name);
    props.setChosenGameCard({
      sprint: false,
      audioCall: false,
    });
  };

  const handleLevelClick = (level: number) => {
    const isSprintGame = props.name === 'Спринт';

    props.setChosenGameCard({
      sprint: isSprintGame,
      audioCall: !isSprintGame,
    });

    props.setWordsGroup(level);
    setLevel(level);
    setIsButtonActive(false);
  };

  useEffect(() => {
    const isSprintGame = props.name === 'Спринт';

    if (isSprintGame && props.chosenGameCard.sprint) {
      setIsButtonActive(true);
    }
    if (isSprintGame && props.chosenGameCard.audioCall) {
      setIsButtonActive(false);
    }
    if (!isSprintGame && props.chosenGameCard.audioCall) {
      setIsButtonActive(true);
    }
    if (!isSprintGame && props.chosenGameCard.sprint) {
      setIsButtonActive(false);
    }

  }, [props]);

  return (
    <div className={styles['game']}>
      <div className={styles['about-game']}>
        <h3 className={styles['game-name']}>{props.name}</h3>
        <p className={styles['game-description']}>
          {props.description}
        </p>
        <p className={styles['levels-intro']}>Выберите уровень:</p>
        <div className={styles['levels']}>
          <div
            className={styles[`${(level === 0 && isButtonActive)
              ? 'level-active-a1'
              : 'level'}`] + ' ' + styles['level-a1']}
            onClick={() => handleLevelClick(0)}>A1</div>
          <div
            className={styles[`${(level === 1 && isButtonActive)
              ? 'level-active-a2'
              : 'level'}`] + ' ' + styles['level-a2']}
            onClick={() => handleLevelClick(1)}>A2</div>
          <div
            className={styles[`${(level === 2 && isButtonActive)
              ? 'level-active-b1'
              : 'level'}`] + ' ' + styles['level-b1']}
            onClick={() => handleLevelClick(2)}>B1</div>
          <div
            className={styles[`${(level === 3 && isButtonActive)
              ? 'level-active-b2'
              : 'level'}`] + ' ' + styles['level-b2']}
            onClick={() => handleLevelClick(3)}>B2</div>
          <div
            className={styles[`${(level === 4 && isButtonActive)
              ? 'level-active-c1'
              : 'level'}`] + ' ' + styles['level-c1']}
            onClick={() => handleLevelClick(4)}>C1</div>
          <div
            className={styles[`${(level === 5 && isButtonActive)
              ? 'level-active-c2'
              : 'level'}`] + ' ' + styles['level-c2']}
            onClick={() => handleLevelClick(5)}>C2</div>
        </div>
        <button
          className={'btn ' + styles[`${(isButtonActive)
            ? 'start-game-btn'
            : 'start-game-btn-disabled'}`]}
          onClick={clickHandler}
          disabled={!isButtonActive}
        >
          Играть
        </button>
      </div>
    </div>
  );
}

export default GameCard;