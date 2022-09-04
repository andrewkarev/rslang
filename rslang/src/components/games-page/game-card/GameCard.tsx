import React, { useEffect, useState } from 'react';
import styles from './game-card.module.css';
import Level from './Level/Level';

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

  const levels = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'];
  const levelsElements = levels.map((item, i) => {
    return (<Level
      levelState={level}
      isButtonActive={isButtonActive}
      handleLevelClick={handleLevelClick}
      order={i}
      levelMark={item}
      key={item}
    />)
  })

  return (
    <div className={styles['game']}>
      <div className={styles['about-game']}>
        <h3 className={styles['game-name']}>{props.name}</h3>
        <p className={styles['game-description']}>
          {props.description}
        </p>
        <p className={styles['levels-intro']}>Выберите уровень:</p>
        <div className={styles['levels']}>
          {levelsElements}
        </div>
        <button
          className={styles['btn'] +' ' + styles[`${(isButtonActive)
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