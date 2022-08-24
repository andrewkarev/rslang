import React from 'react';
import styles from './warning-message.module.css';

interface WarningMessageProps {
  message: string,
  handler: () => void,
}

const WarningMessage: React.FunctionComponent<WarningMessageProps> = ({ message, handler }) => {

  const handleClick = (e: React.SyntheticEvent) => {
    const target = e.target
    if (target instanceof HTMLElement && target.className.match(/wrapper/)) {
      handler();
    }
  };

  return (
    <div className={styles['wrapper']} onClick={handleClick}>
      <div className={styles['warning-message']}>
        {message}
      </div>
    </div>
  );
}

export default WarningMessage;
