import React, { useContext, useEffect, useState } from 'react';
import { learnWordAPI } from '../..';
import { AuthorisationContext } from '../../context/AuthorisationContext';
import IStatistics from '../../types/services-interfaces/IStatistics';
import DailyStatistics from './daily-statistics/DailyStatistics';
import LongTermStatistics from './long-term-statistics/LongTermStatistics';
import styles from './statistics-page.module.css';

const StatisticsPage = () => {
  const { isAuthorised } = useContext(AuthorisationContext);
  const userId = isAuthorised && localStorage.getItem('id');
  // type Stat = {
  //   allAnswers: number,
  //   rightAnswers: number,
  //   learnedWords: number,
  //   newWords: number,
  //   games: {
  //     sprint: {
  //       allAnswers: number,
  //       newWords: number,
  //       rightAnswers: number,
  //       longestStreak: number,
  //     },
  //     audioCall: {
  //       allAnswers: number,
  //       newWords: number,
  //       rightAnswers: number,
  //       longestStreak: number,
  //     },
  //   },
  // } | null;
  const [stats, setStats] = useState<IStatistics | null>(null);
  
  useEffect(() => {
    const asyncFunction = async () => {
      
      if (isAuthorised && userId) {
        const response = await learnWordAPI.getStatistics(userId);

        if (response) {
          setStats(response);
          // console.log(response);
          // const date = new Date();
          // date.setHours(0, 0, 0, 0);

          // console.log(+date)
          
          // const dayStatEntry = Object.entries(response.optional).find(([key, value]) => Date.parse(key) === Number(date))
          // if (dayStatEntry) {
          //   setDayStat(dayStatEntry[1]);
          //   console.log(dayStat);
          // }
          
        }
      } else {
        setStats(null);
      }
    }
    asyncFunction();   
  }, [isAuthorised, userId]);

  return (
    <>
      <div className={ styles['statistics'] }>
        <div className={ `${styles['wrapper']} ${styles['statistics-wrapper']} ` }>
          <h2 className={ styles['title']}>Статистика</h2>
          <DailyStatistics stats={ stats }/>
          <LongTermStatistics stats={ stats }/>
        </div>
      </div>
    </>
  )
}

export default StatisticsPage;