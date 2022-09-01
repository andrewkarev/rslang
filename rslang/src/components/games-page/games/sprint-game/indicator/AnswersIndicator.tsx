import styles from './answers-indicator.module.css';

interface AnswersIndicatorProps {
  streak: number,
}

const AnswersIndicator: React.FunctionComponent<AnswersIndicatorProps> = ({ streak }) => {
  const disableCases = [
    [1, 2, 3, 5, 6, 7, 9, 10, 11],
    [2, 3, 6, 7, 10, 11],
    [3, 7, 11]
  ];

  return (
    <div className={styles['right-answers-indicator']}>
      {(streak < 12)
        && <div className={styles['counter-mark']}>
          <div className={styles['counter-check-mark']}></div>
          <div className={styles[disableCases[0].includes(streak)
            ? 'counter-shadow-disabled'
            : 'counter-shadow']}></div>
        </div>}
      {(streak < 12)
        && <div className={styles['counter-mark']}>
          <div className={styles['counter-check-mark']}></div>
          <div className={styles[disableCases[1].includes(streak)
            ? 'counter-shadow-disabled'
            : 'counter-shadow']}></div>
        </div>}
      <div className={styles['counter-mark']}>
        <div className={styles['counter-check-mark']}></div>
        <div className={styles[disableCases[2].includes(streak) || (streak > 11)
          ? 'counter-shadow-disabled'
          : 'counter-shadow']}></div>
      </div>
    </div>
  );
};

export default AnswersIndicator;
