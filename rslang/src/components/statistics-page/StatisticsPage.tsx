import React from 'react';
import DailyStatistics from './daily-statistics/DailyStatistics';
import LongTermStatistics from './long-term-statistics/LongTermStatistics';
import styles from './statistics-page.module.css';

const StatisticsPage = () => {
  return (
    <>
      <div className={styles['statistics']}>
        <div className={styles['wrapper'] + ' statistics-wrapper'}>
          <h2 className={styles['title']}>Статистика</h2>
          <DailyStatistics />
          <LongTermStatistics />
        </div>
      </div>
    </>
  )
}

export default StatisticsPage;