import React from 'react';
import LearnedWordsChart from './charts/LearnedWordsChart';
import NewWordsChart from './charts/NewWordsChart';
import styles from './long-term-statistics.module.css';

const LongTermStatistics = () => {
  return (
    <div className={ styles['charts-container'] }>
      <div className={ styles['chart'] }>
        <div className={styles['chart-wrapper']}>
          <div className="chart-wrapper">
            <NewWordsChart />
          </div>
        </div>
      </div>
      <div className={ styles['chart'] }>
        <div className={styles['chart-wrapper']}>
          <LearnedWordsChart />
        </div>
      </div>
    </div>
  )
}

export default LongTermStatistics;