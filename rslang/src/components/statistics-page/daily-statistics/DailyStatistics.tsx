import React from 'react';
import styles from './daily-statistics.module.css';
import WordStatistic from './word-statistic/WordStatistic';
import idea from './../../../assets/icons/new.png';
import report from './../../../assets/icons/report.png';
import chart from './../../../assets/icons/chart.png';
import streak from './../../../assets/icons/streak.png';
import GameStatistic from './game-statistic/GameStatistic';

const DailyStatistics = () => {

	const wordsStatisticData = [
		{ 
			title: 'новых слов за день', 
			value: '10', 
			image:  idea
		},
    { 
			title: 'изученных слов за день', 
			value: '25', 
			image: report
		},
    { 
			title: 'правильных ответов за день', 
			value: '80%', 
			image: chart
		}
	];

  const wordsStatisticsElements = wordsStatisticData.map((item, index) => {
    return (
      <WordStatistic 
				title={ item.title } 
				value={ item.value }
				image={ item.image }  
				key={ `word-stat-${index}` }
			/>
    )
  });

	const gamesStatisticsData = [
		{
			name: 'Спринт',
			stats: [
				{
					title: 'новых слов за день',
					value: '4',
					image: idea
				},
				{
					title: 'процент правильных ответов',
					value: '90%',
					image: chart
				},
				{
					title: 'самая длинная серия правильных ответов',
					value: '15',
					image: streak
				}
			]
		},
		{
			name: 'Аудиовызов',
			stats: [
				{
					title: 'новых слов за день',
					value: '6',
					image: idea
				},
				{
					title: 'процент правильных ответов',
					value: '92%',
					image: chart
				},
				{
					title: 'самая длинная серия правильных ответов',
					value: '10',
					image: streak
				}
			]
		}
	];

	const gamesStatisticsElements = gamesStatisticsData.map((item, index) => {
		return (
			<GameStatistic 
				name={ item.name } 
				stats={ item.stats } 
				key={ `game-stat-${index}` }
			/>
		)
	})

	return (
		<div className={ styles['daily-statistics'] }>
			<div className={ styles['words-statistics'] }>
        { wordsStatisticsElements }
			</div>
			<div className={ styles['games-statistics'] }>
				{ gamesStatisticsElements }
			</div>
		</div>
	)
}

export default DailyStatistics;