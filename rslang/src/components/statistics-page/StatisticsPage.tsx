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
  
  const [stats, setStats] = useState<IStatistics | null>(null);
  
  useEffect(() => {
    const asyncFunction = async () => {
      
      if (isAuthorised && userId) {
        const response = await learnWordAPI.getStatistics(userId);

        if (response) {
          setStats(response);          
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
          { !isAuthorised &&
            <p className={ styles['no-stats-message']}>
              Данные статистики доступны только зарегистрированным пользователям
            </p>
          }
          <DailyStatistics stats={ stats }/>
          <LongTermStatistics stats={ stats }/>
        </div>
      </div>
    </>
  )
}

export default StatisticsPage;