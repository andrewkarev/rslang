import React from 'react';
import styles from './daily-statistics.module.css';
import WordStatistic from './word-statistic/WordStatistic';
import idea from './../../../assets/icons/new.png';
import report from './../../../assets/icons/report.png';
import chart from './../../../assets/icons/chart.png';
import streak from './../../../assets/icons/streak.png';
import GameStatistic from './game-statistic/GameStatistic';
import IStatistics from '../../../types/services-interfaces/IStatistics';
import getCurrentDate from '../../../services/get-current-date';

type Props = {
  stats: IStatistics | null;
}

const DailyStatistics: React.FC<Props> = ({ stats }) => {
  let dayStat: {
    allAnswers: number,
    rightAnswers: number,
    learnedWords: number,
    newWords: number,
    games: {
      sprint: {
        allAnswers: number,
        newWords: number,
        rightAnswers: number,
        longestStreak: number,
      },
      audioCall: {
        allAnswers: number,
        newWords: number,
        rightAnswers: number,
        longestStreak: number,
      },
    },
  } | null = null;

  if (stats) {
    const timeStamp = getCurrentDate();

    const dayStatEntry = Object.entries(stats.optional).find(([key, value]) => key === timeStamp)
    if (dayStatEntry) {
      dayStat = dayStatEntry[1];
    }
  }

  const rightAnswersAccuracy = dayStat ?
    Math.round(dayStat.rightAnswers / dayStat.allAnswers * 100) : 0;

  const sprintRightAnswersAccuracy = dayStat ?
    Math.round(dayStat.games.sprint.rightAnswers / dayStat.games.sprint.allAnswers * 100) : 0;

  const audioCallRightAnswersAccuracy = dayStat ?
    Math.round(dayStat.games.audioCall.rightAnswers / dayStat.games.audioCall.allAnswers * 100) : 0;

  const wordsStatisticData = [
    {
      title: 'новых слов за день',
      value: String(dayStat ? dayStat.newWords : 0),
      image: idea
    },
    {
      title: 'изученных слов за день',
      value: String(dayStat ? dayStat.learnedWords : 0),
      image: report
    },
    {
      title: 'правильных ответов за день',
      value: String(Number.isNaN(rightAnswersAccuracy) ? 0 : rightAnswersAccuracy) + '%',
      image: chart
    }
  ];

  const wordsStatisticsElements = wordsStatisticData.map((item, index) => {
    return (
      <WordStatistic
        title={item.title}
        value={item.value}
        image={item.image}
        key={`word-stat-${index}`}
      />
    )
  });

  const gamesStatisticsData = [
    {
      name: 'Спринт',
      stats: [
        {
          title: 'новых слов за день',
          value: String(dayStat ? dayStat.games.sprint.newWords : 0),
          image: idea
        },
        {
          title: 'процент правильных ответов',
          value: String(Number.isNaN(sprintRightAnswersAccuracy) ? 0 : sprintRightAnswersAccuracy) + '%',
          image: chart
        },
        {
          title: 'самая длинная серия правильных ответов',
          value: String(dayStat ? dayStat.games.sprint.longestStreak : 0),
          image: streak
        }
      ]
    },
    {
      name: 'Аудиовызов',
      stats: [
        {
          title: 'новых слов за день',
          value: String(dayStat ? dayStat.games.audioCall.newWords : 0),
          image: idea
        },
        {
          title: 'процент правильных ответов',
          value: String(Number.isNaN(audioCallRightAnswersAccuracy) ? 0 : audioCallRightAnswersAccuracy) + '%',
          image: chart
        },
        {
          title: 'самая длинная серия правильных ответов',
          value: String(dayStat ? dayStat.games.audioCall.longestStreak : 0),
          image: streak
        }
      ]
    }
  ];

  const gamesStatisticsElements = gamesStatisticsData.map((item, index) => {
    return (
      <GameStatistic
        name={item.name}
        stats={item.stats}
        key={`game-stat-${index}`}
      />
    )
  })

  return (
    <div className={styles['daily-statistics']}>
      <div className={styles['words-statistics']}>
        {wordsStatisticsElements}
      </div>
      <div className={styles['games-statistics']}>
        {gamesStatisticsElements}
      </div>
    </div>
  )
}

export default DailyStatistics;