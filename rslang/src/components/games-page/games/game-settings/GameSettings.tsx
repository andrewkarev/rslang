import React from 'react';
import styles from './game-settings.module.css';

interface GameSettingsProps {
  handleFullScreenButtonClick: () => void,
  changeSoundState: () => void,
  closeGame: (choice: string) => void, handle: {
    active: boolean;
    enter: () => Promise<void>;
    exit: () => Promise<void>;
    node: React.MutableRefObject<HTMLDivElement | null>;
  },
  isMuted: boolean,
  choosenGame: string,
}

const GameSettings: React.FunctionComponent<GameSettingsProps> = (props) => {
  const handleCloseButtonClick = () => {
    props.closeGame('');
  };

  const handleVolumeButtonClick = () => {
    props.changeSoundState();
  };

  return (
    <>
      <div className={styles['game-settings']}>
        <div
          className={styles['close-game-wrapper']}
          onClick={handleCloseButtonClick}>
          <div className={styles['close-game']}></div>
        </div>
        {props.choosenGame !== 'Аудио-вызов' && <div
          className={styles['volume-controls-wrapper']}
          onClick={handleVolumeButtonClick}>
          <div
            className={styles[`${props.isMuted
              ? 'volume-controls-muted'
              : 'volume-controls'}`]}
          ></div>
        </div>
        }
        <div
          className={styles['fullscreen-mode-wrapper']}
          onClick={props.handleFullScreenButtonClick}
        >
          <div
            className={styles[`${props.handle.active
              ? 'fullscreen-mode-active'
              : 'fullscreen-mode'}`]}
          ></div>
        </div>
        <div className={styles['about-game-wrapper']}>
          <div className={styles['about-game']}>
            <span className={styles['tooltiptext']}>
              выбрать правильный ответ можно как с помощью мыши так и нажатием на клавиши ArrowRoght, ArrowLeft
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameSettings;
