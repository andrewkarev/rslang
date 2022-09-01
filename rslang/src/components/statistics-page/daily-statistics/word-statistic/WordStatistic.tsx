import React from 'react';
import styles from './word-statistic.module.css';

type Props = {
  title: string;
  value: string;
}

const WordStatistic: React.FC<Props>= ({ title, value }) => {
	return (
		<div className={ styles['word-statistic'] }>
      <p className={ styles['value'] }>{ value }</p>
      <img src="" alt="" className="icon" />
      <h3 className={ styles['title'] }>{ title }</h3>
    </div>
	)
}

export default WordStatistic;