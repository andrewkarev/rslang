import React from 'react';
import styles from './game-statistic.module.css';

type Props = {
  name: string;
  stats: {
    title: string;
    value: string;
    image: string;
  }[];
}

const GameStatistic: React.FC<Props>= ({ name, stats }) => {

  const gameStatsElements = stats.map((item, index) => {
    return (
      <div className={ styles['stat'] } key={ `game-stat-${index}` }>
        <img className={ styles['icon'] } src={ stats[index].image } alt="stat icon" />
        <div className="title">
          <span>{ `${stats[index].title}: ` }</span>
          <span className={ styles['value'] }>{ stats[index].value }</span>
        </div>
      </div>
    )
  });

	return (
		<div className={ styles['game-statistic'] }>
      <h3 className={ styles['name'] }>{ name }</h3>
      { gameStatsElements }
    </div>
	)
}

export default GameStatistic;