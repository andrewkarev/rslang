import React from 'react';
import IStatistics from '../../../types/services-interfaces/IStatistics';
import LearnedWordsChart from './charts/LearnedWordsChart';
import NewWordsChart from './charts/NewWordsChart';
import styles from './long-term-statistics.module.css';

type Props = {
  stats: IStatistics | null;
}

const LongTermStatistics: React.FC<Props> = ({ stats }) => {

  return (
    <div className={ styles['charts-container'] }>
      <div className={ styles['chart'] }>
        <div className={styles['chart-wrapper']}>
            <NewWordsChart stats={ stats }/>
        </div>
      </div>
      <div className={ styles['chart'] }>
        <div className={styles['chart-wrapper']}>
          <LearnedWordsChart stats={ stats }/>
        </div>
      </div>
    </div>
  )
}

export default LongTermStatistics;