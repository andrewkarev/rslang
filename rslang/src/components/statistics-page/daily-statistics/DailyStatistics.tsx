import React from 'react';
import styles from './daily-statistics.module.css';
import WordStatistic from './word-statistic/WordStatistic';

const DailyStatistics = () => {

	const wordsStatisticData = [
		{ title: 'новых слов за день', value: '10' },
    { title: 'изученных слов за день', value: '25' },
    { title: 'правильных ответов за день', value: '80%' }
	];

  const wordsStatisticsElements = wordsStatisticData.map((item) => {
    return (
      <WordStatistic title={ item.title } value={ item.value }/>
    )
  });

	return (
		<div className={ styles['daily-statistics'] }>
			<div className={ styles['words-statistics'] }>
        { wordsStatisticsElements }
			</div>
			<div className="games-statistics">

			</div>
		</div>
	)
}

export default DailyStatistics;