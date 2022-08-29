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
          className={styles['close-game']}
          onClick={handleCloseButtonClick}>
        </div>
        <div
          className={styles[`${props.isMuted
            ? 'volume-controls-muted'
            : 'volume-controls'}`]}
          onClick={handleVolumeButtonClick}
        ></div>
        <div
          className={styles[`${props.handle.active
            ? 'fullscreen-mode-active'
            : 'fullscreen-mode'}`]}
          onClick={props.handleFullScreenButtonClick}
        ></div>
      </div>
    </>
  );
};

export default GameSettings;
