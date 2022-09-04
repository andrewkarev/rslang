import React from 'react';
import styles from './word-statistic.module.css';

type Props = {
  title: string;
  value: string;
  image: string;
}

const WordStatistic: React.FC<Props>= ({ title, value, image }) => {
	return (
		<div className={ styles['word-statistic'] }>
      <p className={ styles['value'] }>{ value }</p>
      <img className={ styles['icon'] } src={ image } alt="word stats" />
      <h3 className={ styles['title'] }>{ title }</h3>
    </div>
	)
}

export default WordStatistic;